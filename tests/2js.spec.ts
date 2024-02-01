import { describe } from "@jest/globals";
import { test, expect } from "@jest/globals";

// TODO: I need to figure a way to make this nicer to work with bundlers
const Component = require("../src/2js");

describe("Component", () => {
    test("creation", () => {
        const component = new Component({});
        expect(component).toBeTruthy();
    });

    test("getting and setting state", () => {
        const component = new Component({
            test: "test",
        }) as any;

        expect(component.test).toBe("test");
        component.test = "test2";
        expect(component.test).toBe("test2");
    });

    test("operator functions", () => {
        // TODO: fix the typing in this component to make this test work
        const component = new Component({
            test: (value: string) => value.toUpperCase(),
        }) as any;

        component.test = "test";
        expect(component.test).toBe("TEST");
    });
});
