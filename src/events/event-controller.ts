import { Request, Response } from "express";
import { CreateEventDto } from "./dtos/CreateEvent.dot";
// import { CreateUserDto } from "../auth/dtos/CreateUser.dto";
import EventService from "./event-service";

class EventController {
	private eventService: EventService;

	constructor(eventService: EventService) {
		this.eventService = eventService;
	}

	createEvent = async (req: Request, res: Response): Promise<void> => {
		try {
			const createEventDto: CreateEventDto = req.body;
			const event = await this.eventService.createEvent(createEventDto);
			res.status(201).json(event);
		} catch (error: any) {
			res.status(500).send({ error: error.message });
		}
	};

	getEvents = async (req: Request, res: Response): Promise<void> => {
		try {
			const userId = (req?.user as any).id;
			const page = parseInt(req.query.page as string) || 1; // Default to page 1
			const limit = 10;

			const sortBy = (req.query.sortBy as string) || "date";
			const sortDirection = (req.query.sortDirection as string) || "asc";
			const events = await this.eventService.getEvents(
				userId,
				page,
				limit,
				sortBy,
				sortDirection
			);
			res.status(200).json(events);
		} catch (error: any) {
			res.status(500).send({ error: error.message });
		}
	};

	getEventById = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const event = await this.eventService.getEventById(id);
			if (!event) {
				res.status(404).json({ message: "Event not found" });
				return;
			}
			res.status(200).json(event);
		} catch (error: any) {
			res.status(500).send({ error: error.message });
		}
	};
}

export default EventController;
