import ReactModal from 'react-modal';
import COLORS from '../../sass/_colors.scss'
import './style.scss';

export const Modal = ({ show, setShow, children }) => {

    ReactModal.setAppElement('body')

    const customStyle = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            width: '50vw',
            height: 'max-content',
            outline: `solid 0.5vw ${COLORS.primary}`,
            borderRadius: '3vw',
            gap: '1vw'
        }
    }
    
    return (
        <div className='Modal-Component' >
            <ReactModal 
                style={customStyle}
                isOpen={show}
                onRequestClose={() => setShow(false)}
                contentLabel="Example Modal">
                {children}
            </ReactModal>
        </div>
    )
}