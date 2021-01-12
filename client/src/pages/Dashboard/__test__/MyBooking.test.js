import { testSnapshots } from "utils/test/test.utils";
import MyBooking from "../MyBooking";

jest.mock("react-redux", () => ({
  useDispatch: () => (args) => args,
  useSelector: () => (args) => args,
}));
// .mock("redux/services/receipt", () => ({
//   fetchListReceiptIfNeeded: () => (args) => args,
// }))

describe("Test MyBooking component", () => {
  testSnapshots(MyBooking, [
    {
      props: {},
      description: "MyBooking component should match snapshots",
    },
  ]);
});
