import { testSnapshots } from "utils/test/test.utils";
import FormBooking from "../FormBooking";

jest
  .mock("components/Button/Default", () => "ButtonDefault")
  .mock("components/Select/Mini", () => "SelectMini")
  .mock("components/Select/Large", () => "SelectLarge")
  .mock("components/Picker/Date", () => "DatePicker")
  .mock("components/Picker/Time", () => "TimePicker")
  .mock("react-redux", () => ({
    useDispatch: () => (args) => args,
  }))
  // .mock("moment", () => "moment")
  .mock("hooks", () => ({ useMergeState: () => "useMergeState" }))
  .mock("redux/services/ticket", () => ({
    bookingCourse: () => (args) => args,
  }));

describe("Test FormBooking component", () => {
  testSnapshots(FormBooking, [
    {
      props: {},
      description: "FormBooking component should match snapshots",
    },
  ]);
});
