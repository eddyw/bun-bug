import "reflect-metadata";
import { Container, injectable } from "inversify";

@injectable()
class Foo {}

const container = new Container();
container.bind("Foo").to(Foo);

container.getAsync("Foo").then(() => {
	console.log("Hello Bun!");
});
