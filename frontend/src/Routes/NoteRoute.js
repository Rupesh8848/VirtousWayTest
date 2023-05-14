import React from "react";
import { Split } from "@geoffcox/react-splitter";
import { useDispatch } from "react-redux";
import { getAllNoteTitle } from "../Slices/noteSlice";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
export default function NoteRoute() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllNoteTitle());
  }, []);

  return (
    <section className="mt-[1rem] border-t h-full">
      <Split initialPrimarySize="20%">
        <LeftPane />
        <RightPane />
      </Split>
    </section>
  );
}
