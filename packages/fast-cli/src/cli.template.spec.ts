import { expect, test } from "@playwright/test";
import { tsTemplate } from "./cli.template.js";

test.describe("template", () => {
    test("tsTemplate", () => {
        const renderable1 = tsTemplate`foo${c => c.tagName}`;
        const renderable2 = tsTemplate`${c => c.tagName}foo`;
        const renderable3 = tsTemplate`foo${c => c.tagName}bat`;

        expect(renderable1.render({
            tagName: "bar",
            className: "bat",
            definitionName: "baz",
            componentPrefix: "test"
        })).toEqual("foobar");
        expect(renderable2.render({
            tagName: "bar",
            className: "bat",
            definitionName: "baz",
            componentPrefix: "test"
        })).toEqual("barfoo");
        expect(renderable3.render({
            tagName: "bar",
            className: "bat",
            definitionName: "baz",
            componentPrefix: "test"
        })).toEqual("foobarbat");
    });
});
