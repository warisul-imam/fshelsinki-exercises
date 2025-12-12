const Header = ({course}) => (
  <h1>{course}</h1>
);

const Part = ({part}) => (
  <p>{part.name} {part.number_of_exercises}</p>
);

const Content = ({content}) => (
  <>
    {
      content.map((part, index) => (
        <Part part={part} key={index} />
      ))
    }
  </>
);

const Total = ({content}) => (
  <p>Number of exercises {content.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}</p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  )
}

export default App