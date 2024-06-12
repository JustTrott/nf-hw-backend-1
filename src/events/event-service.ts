import mongoose from "mongoose";
import { CreateEventDto } from "./dtos/CreateEvent.dot";
import EventModel, { IEvent } from "./models/Event";
import { Event } from "./types/response";

// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
	async getEventById(id: string): Promise<IEvent | null> {
		return await EventModel.findOne({ id });
	}

	async getEvents(): Promise<IEvent[]> {
		return await EventModel.find().exec();
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
