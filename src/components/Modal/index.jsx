import ReactModal from 'react-modal';
import COLORS from '../../sass/_colors.scss'
import './style.scss';

export const Modal = ({ show, setShow, isMobile, children }) => {

    ReactModal.setAppElement('body')

    const customStyle = {
        content: {
            inset: '0',
            fontSize: isMobile ? '5vw' : '1.25vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            width: isMobile ? '80vw' : '50vw',
            height: 'max-content',
            outline: isMobile? `solid 2vw ${COLORS.primary}` : `solid 0.5vw ${COLORS.primary}`,
            borderRadius: '3vw',
            gap: isMobile ? '3vw' : '1vw'
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