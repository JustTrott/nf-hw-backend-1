import mongoose from "mongoose";
import { CreateEventDto } from "./dtos/CreateEvent.dot";
import EventModel, { IEvent } from "./models/Event";
import UserModel, { IUser } from "../auth/models/User";
import { Event } from "./types/response";

// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
	async getEventById(id: string): Promise<IEvent | null> {
		return await EventModel.findOne({ id });
	}

	async getEvents(
		userId: string,
		page: number,
		limit: number,
		sortBy: string,
		sortDirection: string
	): Promise<IEvent[]> {
		const user = await UserModel.findById(userId);
		const skip = (page - 1) * limit;
		const sortOrder = sortDirection === "desc" ? -1 : 1;

		return await EventModel.find({ location: user?.city })
			.sort({ [sortBy]: sortOrder }) // Dynamic sorting
			.skip(skip)
			.limit(limit);
	}

	async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
		const { name, description, date, location, duration } = createEventDto;
		const latestEvent = await EventModel.findOne()
			.sort({ id: -1 }) // Sort by ID in descending order
			.exec();

		const nextId = latestEvent ? latestEvent.id + 1 : 1; // Start with 1 if no events exist
		const newEvent = new EventModel({
			id: nextId,
			name,
			description,
			date: new Date(date),
			location,
			duration,
		});

		await newEvent.save();
		return newEvent;
	}
}

export default EventService;
