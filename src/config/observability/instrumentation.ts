import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { KnexInstrumentation } from "@opentelemetry/instrumentation-knex";
import { NodeSDK } from "@opentelemetry/sdk-node";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);
const sdk = new NodeSDK({
  serviceName: "encurtador-url",
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4317",
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new KnexInstrumentation(),
  ],
});

export const initializedOtel = async () => {
  console.log("Inicializado com sucesso");
  sdk.start();
};
process.on("beforeExit", async () => {
  await sdk.shutdown();
});
