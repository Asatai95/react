
import React from "react"
import PropTypes from "prop-types"
import posed from "react-pose"
import styled from "styled-components"
import Swiper from "swiper"

const ModalContent = styled(
  posed.div({
    draggable: "y",
    dragBounds: ({ height }) => {
      return { top: parseInt(height), bottom: 0 }
    },
    dragEnd: {
      x: 0,
      y: 0,
      transition: "spring",
    },
    hidden: {
      y: ({ height }) => height,
      opacity: 0,
      transition: { duration: 500 },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 500 },
    },
  })
 )`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
 `

 const ModalContainer = styled(posed.div())`
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;
 top: 0;
 width: 100%;
 height: 100%;
`

export default class PopAPP extends React.Component {

  state = {
    isShown: false,
    isPoseCompleted: false,
    dismissesByDrag: false,
    visibilityStyle: "hidden",
    swiper: null,
  }

  show = () => {
    if (this.state.isShown) {
      return
    }
    this.setState({
      isShown: true,
      isPoseCompleted: false,
      dismissesByDrag: false,
      visibilityStyle: "visible",
    })
    this.props.onOpen()
  }

  onPoseComplete = () => {
    this.setState({
      isPoseCompleted: true,
    })
    if (!this.state.isShown) {
      this.setState({ visibilityStyle: "hidden" })
    }
    if (this.state.swiper === null) {
      const swiper = new Swiper(".swiper-container", {
        slidesPerView: "auto",
        freeMode: true,
      })
      this.setState({ swiper: swiper })
    } else {
      try{
        this.state.swiper.slideTo(0)
      }catch{}
    }
  }

  dismiss = () => {
    if (!this.state.isShown) {
      return
    }
    this.setState({
      isShown: false,
      isPoseCompleted: false,
      dismissesByDrag: false,
    })
    const obj= document.getElementById('popupwin');
    obj.classList.remove("popupwin_active")
    this.props.onClose()
  }

  onChangeDrag = y => {
    if (this.state.dismissesByDrag) {
      return
    }
    if (!this.state.isPoseCompleted) {
      return
    }
    const thredholdY = parseInt(this.props.height) / 2
    if (y < thredholdY) {
      return
    }
    this.setState({ dismissesByDrag: true })
  }

  onDragEnd = () => {
    if (!this.state.dismissesByDrag) {
      return
    }
    this.dismiss()
  }

  render() {
    return (
      <ModalContainer
       style={{
         visibility: this.state.visibilityStyle,
       }}
       pose={this.state.isShown ? "visible" : "hidden"}
       onPoseComplete={() => {
         this.onPoseComplete()
       }}
       onClick={() => {
         this.dismiss()
       }}
     >
       <ModalContent
         height={this.props.height}
         onDragEnd={() => {
           this.onDragEnd()
         }}
         onValueChange={{
           y: y => {
             this.onChangeDrag(y)
           },
         }}
         pose={this.state.isShown ? "visible" : "hidden"}
         onClick={e => {
           e.stopPropagation()
         }}
       >
          <div className="popup">
            <p className="swiper-slide">{this.props.item}</p>
            <button type="button" className="popupnav_bt"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
          </div>
      </ModalContent>
    </ModalContainer>
    );
  }

}

PopAPP.propTypes = {
  height : PropTypes.string.isRequired,
}