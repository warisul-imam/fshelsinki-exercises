const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => <strong>total of {parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, 0)} exercises</strong>

const Course = ({ course }) => (
  <>
    <Header courseName={course.name} />
    {course.parts.map(part =>
      <Part
        key={part.id}
        name={part.name}
        exercises={part.exercises}
      />
    )}
    <Total parts={course.parts} />
  </>
);

export default Course;