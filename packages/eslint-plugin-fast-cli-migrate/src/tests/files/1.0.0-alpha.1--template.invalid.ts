import { html } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { FoundationElementTemplate } from "@microsoft/fast-foundation";
import type { Foo } from "./foo.js";

export const template: FoundationElementTemplate<ViewTemplate<Foo>> = (
    context,
    definition
) =>
    html`<template></template>`;
