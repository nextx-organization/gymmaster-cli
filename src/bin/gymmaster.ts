#!/usr/bin/env node
import { setBrand } from "../core/brand.js";
setBrand("gymmaster");
const { main } = await import("../main.js");
await main(process.argv);
