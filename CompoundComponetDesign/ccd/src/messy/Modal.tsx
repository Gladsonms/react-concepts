type ModalPropsType = {
  title: string;
  body: string;
  primaryActionText: string;
  secondaryActionText: string;
};

function Modal(props:ModalPropsType) {
    const {body,primaryActionText,secondaryActionText,title}=props
    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <h2 className="modal-header">{title}</h2>
                <p className="modal-body">{body}</p>
                <div className="modal-footer">
                    {secondaryActionText}
                    {primaryActionText}
                </div>
            </div>
        </div>
    );
}

export default Modal;