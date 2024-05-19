import React from 'react';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ModalSkeletonProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const CustomModal: React.FC<ModalSkeletonProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
