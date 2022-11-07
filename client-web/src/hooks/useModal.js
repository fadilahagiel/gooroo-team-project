import {useState} from 'react'

function useModal(defaultValue = false){
    const [modalOpen, setModalOpen] = useState(defaultValue);
    const showModal = () => setModalOpen(true)
    const hideModal = () => setModalOpen(false)

    return { modalOpen, showModal, hideModal }
}

export default useModal