import { describe } from "@jest/globals";
import { test, expect } from "@jest/globals";

// TODO: I need to figure a way to make this nicer to work with bundlers
const Component = require("../src/2js");

describe("Component", () => {
    test("creation", () => {
        const component = new Component({});
        expect(component).toBeTruthy();
    });

    test("creation of a component with initial state", () => {
        const component = new Component({ test: "test" });
        expect(component.test).toBe("test");
    });

    test("json representation of a component", () => {
        const component = new Component({
            test: "this is a test123",
            name: "Hello World!",
            age: 42,
        });

        expect(JSON.stringify(component)).toBe(
            '{"test":"this is a test123","name":"Hello World!","age":42}',
        );
    });

    test("object key value representation of a component", () => {
        const component = new Component({
            test: "this is a test123",
            name: "Hello World!",
            age: 42,
        });

        expect(Object.entries(component)).toEqual([
            ["test", "this is a test123"],
            ["name", "Hello World!"],
            ["age", 42],
        ]);
    });

    test("json representation after changing state", () => {
        const component = new Component({
            test: "this is a test123",
            name: "Hello World!",
            age: 42,
        });

        component.test = "changed value";

        expect(JSON.stringify(component)).toBe(
            '{"test":"changed value","name":"Hello World!","age":42}',
        );
    });

    test("getting state of a operator function with no value", () => {
        const component = new Component({
            test: (value: string) => value.toUpperCase(),
        });

        expect(component.test).toBeUndefined();
    });

    test("getting state of a non-existent property", () => {
        const component = new Component({});
        expect(component.test).toBeUndefined();
    });

    test("setting state of a non-existent property", () => {
        const component = new Component({});
        component.test = "test";

        // if the property doesn't exist on initilization, we expect it to be created
        expect(component.test).toBe("test");
    });

    test("return value of a state change to a non-existent property", () => {
        const component = new Component({});
        const returnedValue = (component.test = "test");

        expect(returnedValue).toBe("test");

        const secondReturnedValue = (component.test = "test2");
        expect(secondReturnedValue).toBe("test2");
    });

    test("return value of a state change", () => {
        const component = new Component({ test: "test" });
        const returnedValue = (component.test = "test2");

        expect(returnedValue).toBe("test2");
    });

    test("return values of operator functions", () => {
        const component = new Component({
            test: (value: string) => value.toUpperCase(),
        });

        // when assigning a value, the new value should be returned
        const returnedValue = (component.test = "test");
        expect(returnedValue).toBe("TEST");
    });

    test("getting and setting state", () => {
        const component = new Component({
            test: "test",
        });

        expect(component.test).toBe("test");
        component.test = "test2";
        expect(component.test).toBe("test2");
    });

    test("operator functions", () => {
        const component = new Component({
            test: (value: string) => value.toUpperCase(),
        });

        component.test = "test";
        expect(component.test).toBe("TEST");
    });
});
