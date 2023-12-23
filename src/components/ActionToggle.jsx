import { myCal } from "../Services/get-elements";
export const ActionToggle = () => {
  return (
    <>
      <input onClick={myCal} type="checkbox" id="switch" />
      <label for="switch">Toggle</label>
    </>
  );
};
