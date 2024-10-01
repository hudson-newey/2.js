import { describe } from "@jest/globals";
import { test, expect } from "@jest/globals";
import { Component } from "../src/2js";

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

    // TODO: this functionality is not yet functional
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

    // we allow executing functions on classes
    test("object methods", () => {
        const component = new Component({
            test: () => "test",
        });

        expect(component.test()).toBe("test");
    });

    test("object methods that return values", () => {
        const component = new Component({
            sayHello: (name: string) => `Hello ${name}!`,
        });

        expect(component.sayHello("World")).toBe("Hello World!");
    });

    test("object methods that don't have enough arguments", () => {
        const component = new Component({
            sayHello: (name: string) => `Hello ${name}!`,
        });

        // we should be able to call a object method without all the arguments
        // but the values should be undefined
        // therefore, when we stringify it, we should see undefined in the
        // stringified output
        expect(component.sayHello()).toBe("Hello undefined!");
    });

    test("javascript string templates", () => {
        const component = new Component({
            shoppingList: [
                "Milk",
                "Eggs",
                "Bread",
                "Butter",
            ],
            template: (shoppingList: string[]) => `Shopping list: ${shoppingList.join(", ")}`,
        });

        expect(component.template(component.shoppingList)).toBe(
            "Shopping list: Milk, Eggs, Bread, Butter",
        );
    });
});
