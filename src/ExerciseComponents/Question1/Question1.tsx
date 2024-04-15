import { useEffect, useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

const INITIAL_COUNT = 0; // タイマーの初期値

function TimerModal({ isOpen, onClose }: { isOpen: any; onClose: any }) {
  const [count, setCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => count + 1); // stateではなく更新用のキューを見るので、依存配列にcountがなくても動く？
    }, 1000);

    return () => {
      setCount(INITIAL_COUNT);
      clearInterval(intervalId);
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>モーダル</ModalHeader>
        <ModalCloseButton />
        <ModalBody>このモーダルを開いてから経過した時間：{count}秒</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function Question1() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center pt={20}>
      <Button onClick={onOpen}>モーダルを開く</Button>
      <TimerModal isOpen={isOpen} onClose={onClose} />
    </Center>
  );
}
