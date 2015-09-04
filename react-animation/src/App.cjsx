{TransitionSpring} = require("react-motion")

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

  renderStep: (step, index)->
      console.log "renderStep: ", @state.open
      if @state.open
        yposition = [-50, 0]
        opacity = [0, 1]
      else
        yposition = [0, -50]
        opacity = [1, 0]

      <TransitionSpring key={index} endValue={{opacity: {val: opacity[1]}, yposition: {val: yposition[1]} }} willLeave={@willLeave}>
      {
        (interpolated)=>

          <li key={step.title} style={{transform: "translate3d(0, #{interpolated.yposition.val}px, 0)", opacity: interpolated.opacity.val}}>
            <a href="#">{step.title}</a>
          </li>
      }
      </TransitionSpring>

  willLeave: ->
    console.log "willLeave", arguments

  toggleCollapse: (e)->
    console.log "toggleCollapse!"
    @setState({open: !@state.open})
    console.log "toggleCollapse: ", @state.open

  render: ->
    console.log "Lesson.render()", @state.open
    <div className="Lesson">
      <header onClick={@toggleCollapse}>
        <h1>
          { @props.title }
        </h1>
      </header>
      <ul>
        {@props.steps.map(@renderStep)}
      </ul>
    </div>


App = React.createClass

  render: ->
    <div className="container">
      <Lesson {...lesson} />
    </div>

module.exports = App
