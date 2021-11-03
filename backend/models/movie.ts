import mongoose from 'mongoose';

interface IMovie {
	id: string;
	name: string;
	isInTheaters: boolean;
	yearOfPublication: number;
}

const schema = {
	name: String,
	isInTheaters: Boolean,
	yearOfPublication: Number
};

export const Movie = mongoose.model('Movies', new mongoose.Schema(schema));
