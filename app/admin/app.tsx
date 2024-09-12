"use client";
import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvide from "ra-data-simple-rest";

const dataProvider = simpleRestProvide("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={ListGuesser}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default App;
