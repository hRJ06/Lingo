"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvide from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";

const dataProvider = simpleRestProvide("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        edit={CourseEdit}
        create={CourseCreate}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default App;
