{TransitionSpring, Spring} = require("react-motion")

console.log "Spring:", Spring

lesson =
  title: "Lesson 1: Getting started"
  steps: [
    {title: "Watch: Lecture 1"},
    {title: "Read: Chapters 1-3 in Textbook"},
    {title: "Submit: Homework 1"},
  ]

StepList = React.createClass

  render: ->
    defaultValue = @getDefaultValue()
    <TransitionSpring defaultValue={defaultValue} endValue={@getEndValue} willLeave={@onWillLeave}>
    {(interpolatedVals)=>
      <ul>
        {
          @props.steps.map (step, index)=>
            interpolated = interpolatedVals[index]
            style =
              transform: "translate3d(0, #{interpolated.yposition.val}px, 0)"
              opacity: interpolated.opacity.val
            <li key={step.title} className="Step" style={style}>
              <a href="#">{step.title}</a>
            </li>
        }
      </ul>
    }
    </TransitionSpring>

  getStepsAsObject: (reverse=no)->
    obj = {}
    index = 0
    for step in @props.steps
      key = index
      if reverse
        key = (@props.steps.length-1) - key
      obj[key] = step
      index++
    return obj

  getDefaultValue: ->
    steps = @getStepsAsObject()
    vals = {}
    for key, step of steps
      if @props.open
        vals[key] = {opacity: {val: 1}, yposition: {val: 0}}
      else
        vals[key] = {opacity: {val: 0}, yposition: {val: -40}}
    return vals

  getEndValue: (prevVal)->
    steps = @getStepsAsObject()
    vals = {}
    trackIndex = 0
    if !@props.open
      #steps = @getStepsAsObject(yes)
      console.log "reversed: ", steps
      trackIndex = @props.steps.length - 1

    for key, step of steps
      console.log "key, trackIndex", key, trackIndex
      key = parseInt(key)
      if key is trackIndex
        if @props.open
          vals[key] = {opacity: {val: 1}, yposition: {val: 0}}
        else
          vals[key] = {opacity: {val: 0}, yposition: {val: -40}}
      else
        if key is 0
          prev = prevVal[@props.steps.length-1]
        else
          prev = prevVal[key-1]
        vals[key] = {opacity: {val: prev.opacity.val}, yposition: {val:prev.yposition.val}}
    return vals

  onWillLeave: (key, value, endValue, currentValue, currentSpeed)->
    console.log "onWillLeave", currentSpeed


Lesson = React.createClass

  getInitialState: ->
    open: yes

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
      <StepList open={@state.open} steps={@props.steps} />
    </div>


App = React.createClass

  render: ->
    <div className="container">
      <Lesson {...lesson} />
    </div>

module.exports = App
