import reactDom from "react-dom"

const Portal = ({ children }) => {
    return typeof document === 'object'
      ? reactDom.createPortal(children, document.body)
      : null
}

export default Portal