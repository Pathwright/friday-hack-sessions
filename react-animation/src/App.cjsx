{Spring} = require("react-motion")

lesson = 
  title: "Lesson 1: Getting started"
  steps: [
    {title: "Watch: Lecture 1"},
    {title: "Read: Chapters 1-3 in Textbook"},
    {title: "Submit: Homework 1"},
  ]


Lesson = React.createClass

  getInitialState: ->
    open: yes

  renderStep: (step)->
    <li key={step.title}>
      <a href="#">{step.title}</a>
    </li>

  render: ->
    openXVal = if @state.open then 400 else 0
    <div className="Lesson">
      <header onClick={=> @setState(open: !@state.open) }>
        <h1>
          { @props.title }
        </h1>
      </header>
      <Spring defaultValue={{val: 0}} endValue={{val: openXVal}}>
      {
        (interpolated)=>
          <ul style={{transform: "translate3d(#{interpolated.val}px, 0, 0)"}}>
            {@props.steps.map(@renderStep)}
          </ul>
      }
      </Spring>
    </div>


App = React.createClass
  
  render: ->
    <div className="container">
      <Lesson {...lesson} />
    </div>

module.exports = App