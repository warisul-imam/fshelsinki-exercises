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
  <p>Number of exercises {content.reduce((accumulator, currentValue) => accumulator + currentValue.number_of_exercises, 0)}</p>
);

const App = () => {
  const course = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const content = [
    {
      "name" : part1,
      "number_of_exercises": exercises1,
    },
    {
      "name" : part2,
      "number_of_exercises": exercises2,
    },
    {
      "name" : part3,
      "number_of_exercises": exercises3,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}

export default App