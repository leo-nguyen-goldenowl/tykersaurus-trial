import { testSnapshots } from "utils/test/test.utils";
import Dashboard from "../index";

jest
  .mock("../FormBooking", () => "FormBooking")
  .mock("../MyBooking", () => "MyBooking")
  .mock("containers/HeaderPage", () => "HeaderPage");

describe("Test Dashboard component", () => {
  testSnapshots(Dashboard, [
    {
      props: {},
      description: "Dashboard component should match snapshots",
    },
  ]);
});
