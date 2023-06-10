import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    Button, ModalCloseButton,
} from '@chakra-ui/react';

const CustomModal = ({isOpen, handleClose, handleSave, Component}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="xl">
            <ModalOverlay/>
            <ModalContent>
                <Component />
                <ModalCloseButton mt={2} size={"lg"}/>
                <ModalFooter>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
