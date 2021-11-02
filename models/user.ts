// import mongoose from 'mongoose';
import Joi from 'joi';
import mongoose from 'mongoose';

interface IUser {
	name: string;
	username: string;
	age: number;
	nationality: 'MEXICO' | 'BRAZIL' | 'PERU' | 'USA' | 'CANADA';
}

export function validateUser(user: IUser) {
	const schema = Joi.object({
		name: Joi.string(),
		username: Joi.string(),
		age: Joi.number(),
		nationality: Joi.array().items(
			Joi.string().valid('MEXICO', 'BRAZIL', 'PERU', 'USA', 'CANADA')
		)
	});

	return schema.validate(user);
}

const schema = {
	name: String,
	username: String,
	age: Number,
	nationality: {
		type: String,
		enum: ['MEXICO', 'BRAZIL', 'PERU', 'USA', 'CANADA']
	}
};

export const User = mongoose.model('Users', new mongoose.Schema(schema));
