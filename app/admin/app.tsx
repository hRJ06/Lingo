"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvide from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitList } from "./unit/list";
import { UnitEdit } from "./unit/edit";
import { UnitCreate } from "./unit/create";
import { LessonList } from "./lesson/list";
import { LessonEdit } from "./lesson/edit";
import { LessonCreate } from "./lesson/create";
import { ChallengeList } from "./challenge/list";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionCreate } from "./challengeOption/create";

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
      <Resource
        name="units"
        list={UnitList}
        edit={UnitEdit}
        create={UnitCreate}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        edit={LessonEdit}
        create={LessonCreate}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        edit={ChallengeEdit}
        create={ChallengeCreate}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        edit={ChallengeOptionEdit}
        create={ChallengeOptionCreate}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default App;
