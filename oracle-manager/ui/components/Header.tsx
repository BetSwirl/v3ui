import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { EthereumIcon, FailedIcon, OptimismIcon, BaseIcon } from '@snx-v3/icons';
import {
  disconnect,
  onboard,
  useIsConnected,
  useWallet,
  useNetwork,
  Network,
} from '@snx-v3/useBlockchain';
import { FC } from 'react';
import { shortAddress } from '../utils/addresses';
import { GitHubIcon } from './GitHubIcon';

const activeIcon = (currentNetwork: Network) => {
  switch (currentNetwork.id) {
    case 1:
      return { icon: <EthereumIcon />, name: 'Ethereum' };
    case 10:
      return { icon: <OptimismIcon />, name: 'Optimism' };
    case 5:
      return { icon: <EthereumIcon />, name: 'Goerli Testnet' };
    case 420:
      return { icon: <OptimismIcon />, name: 'Optimistic Goerli' };
    case 84531:
      return {
        icon: <BaseIcon />,
        name: 'Base Goerli',
      };

    default:
      return { icon: <FailedIcon width="24px" height="24px" />, name: 'Unsupported Network' };
  }
};

export const Header: FC = () => {
  const isWalletConnected = useIsConnected();
  const currentNetwork = useNetwork();
  const wallet = useWallet();

  const { name, icon } = activeIcon(currentNetwork);
  const switchNetwork = async (id: number) => {
    return onboard?.setChain({ chainId: `0x${id.toString(16)}` });
  };
  return (
    <Flex as="header" p="2" flexDir="column" w="100%" gap="2">
      <Flex w="100%" justifyContent="space-between" alignItems="center" px="5">
        <svg
          width="202"
          height="22"
          viewBox="0 0 202 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.81239 5.58926C6.61525 5.35964 6.37254 5.24456 6.08372 5.24456H0.177C0.124536 5.24456 0.0816109 5.22765 0.0492845 5.19384C0.0164282 5.16057 0 5.12293 0 5.08257V1.02966C0 0.989301 0.0164282 0.952214 0.0492845 0.918399C0.0816109 0.884583 0.124536 0.867676 0.177 0.867676H6.41864C7.99362 0.867676 9.35239 1.52325 10.4944 2.83332L12.0106 4.7177L9.05722 8.38555L6.81239 5.58926ZM17.7207 2.81314C18.8627 1.51616 20.2278 0.867676 21.8161 0.867676H28.0381C28.0906 0.867676 28.1298 0.881311 28.1563 0.908036C28.1822 0.935306 28.1955 0.975666 28.1955 1.02966V5.08257C28.1955 5.12293 28.1822 5.16057 28.1563 5.19384C28.1298 5.22765 28.0906 5.24456 28.0381 5.24456H22.1314C21.8426 5.24456 21.5998 5.35964 21.4027 5.58926L17.0514 10.9795L21.4223 16.4101C21.6195 16.6266 21.8553 16.7346 22.1314 16.7346H28.0381C28.0906 16.7346 28.1298 16.7515 28.1563 16.7854C28.1822 16.8192 28.1955 16.8633 28.1955 16.9168V20.9697C28.1955 21.0101 28.1822 21.0477 28.1563 21.081C28.1298 21.1148 28.0906 21.1317 28.0381 21.1317H21.8161C20.2278 21.1317 18.8691 20.4767 17.7403 19.166L14.1176 14.6675L10.4944 19.166C9.35239 20.4767 7.98726 21.1317 6.39903 21.1317H0.177C0.124536 21.1317 0.0847905 21.1148 0.0588234 21.081C0.0323264 21.0472 0.0196078 21.0035 0.0196078 20.949V16.8961C0.0196078 16.8557 0.0323264 16.8186 0.0588234 16.7848C0.0847905 16.751 0.124536 16.7341 0.177 16.7341H6.08372C6.35929 16.7341 6.602 16.6195 6.81239 16.3894L11.0848 11.0804L17.7207 2.81314Z"
            fill="#2ED9FF"
          />
          <path
            d="M49.2356 4H42.5356C40.8156 4 39.4156 5.44 39.4156 7.12V14.9C39.4156 16.62 40.8556 18 42.5356 18H49.2356C50.9556 18 52.3556 16.56 52.3556 14.9V7.12C52.3556 5.38 50.8956 4 49.2356 4ZM49.8756 14.6C49.8756 15.3 49.2956 15.88 48.5956 15.88H43.1756C42.4956 15.88 41.9156 15.3 41.9156 14.6V7.42C41.9156 6.72 42.4956 6.14 43.1756 6.14H48.5956C49.2956 6.14 49.8756 6.72 49.8756 7.42V14.6ZM57.1667 9.86C57.1667 9.46 57.4867 9.18 57.8667 9.18H62.2667V7.16H58.8467L57.1667 8.52V7.16H54.8667V18H57.1667V9.86ZM66.6999 16C66.0599 16 65.5399 15.5 65.5399 14.84V10.32C65.5399 9.68 66.0599 9.18 66.6999 9.18H71.0199V15.3C71.0199 15.7 70.6999 16 70.3199 16H66.6999ZM69.2799 18L71.0199 16.52V18H73.3199V7.16H66.0799C64.5599 7.16 63.2399 8.42 63.2399 10V15.16C63.2399 16.68 64.4999 18 66.0799 18H69.2799ZM82.8213 18C84.3613 18 85.6613 16.74 85.6613 15.16V14.16H83.3613V14.84C83.3613 15.5 82.8413 16 82.2013 16H79.1413C78.5013 16 77.9813 15.5 77.9813 14.84V10.32C77.9813 9.68 78.5013 9.18 79.1413 9.18H82.2013C82.8413 9.18 83.3613 9.68 83.3613 10.32V11.02H85.6613V10C85.6613 8.42 84.3613 7.16 82.8213 7.16H78.5013C76.9213 7.16 75.6813 8.46 75.6813 10V15.16C75.6813 16.74 76.9813 18 78.5013 18H82.8213ZM88.0507 3.28V18H90.3707V3.28H88.0507ZM99.4717 9.14C100.112 9.14 100.572 9.6 100.572 10.24V11.54H95.0317V10.3C95.0317 9.64 95.5317 9.14 96.1717 9.14H99.4717ZM99.9917 18C101.532 18 102.832 16.88 102.832 15.3V14.58H100.572V14.86C100.572 15.52 100.052 16.02 99.4117 16.02H96.1717C95.5317 16.02 95.0317 15.52 95.0317 14.86V13.32H102.832V9.94C102.832 8.4 101.612 7.16 100.052 7.16H95.5717C94.0117 7.16 92.7517 8.42 92.7517 10V15.16C92.7517 16.72 94.0117 18 95.5717 18H99.9917ZM121.959 15.38L126.099 7.6V18H128.599V4H125.499L120.699 13.02L115.919 4H112.799V18H115.279V7.58L119.459 15.38H121.959ZM134.512 16C133.872 16 133.352 15.5 133.352 14.84V10.32C133.352 9.68 133.872 9.18 134.512 9.18H138.832V15.3C138.832 15.7 138.512 16 138.132 16H134.512ZM137.092 18L138.832 16.52V18H141.132V7.16H133.892C132.372 7.16 131.052 8.42 131.052 10V15.16C131.052 16.68 132.312 18 133.892 18H137.092ZM146.034 9.86C146.034 9.46 146.354 9.18 146.734 9.18H150.594C151.234 9.18 151.734 9.68 151.734 10.32V18H154.054V10C154.054 8.42 152.754 7.16 151.214 7.16H147.714L146.034 8.58V7.16H143.734V18H146.034V9.86ZM159.884 16C159.244 16 158.724 15.5 158.724 14.84V10.32C158.724 9.68 159.244 9.18 159.884 9.18H164.204V15.3C164.204 15.7 163.884 16 163.504 16H159.884ZM162.464 18L164.204 16.52V18H166.504V7.16H159.264C157.744 7.16 156.424 8.42 156.424 10V15.16C156.424 16.68 157.684 18 159.264 18H162.464ZM172.325 15.66C171.685 15.66 171.165 15.16 171.165 14.52V10.32C171.165 9.68 171.685 9.18 172.325 9.18H176.805V14.98C176.805 15.38 176.485 15.66 176.105 15.66H172.325ZM176.285 21.92C177.865 21.92 179.125 20.62 179.125 19.1V7.16H171.705C170.185 7.16 168.865 8.42 168.865 10V14.84C168.865 16.36 170.125 17.68 171.705 17.68H175.065L176.805 16.2V18.84C176.805 19.5 176.305 20 175.645 20H172.825C172.185 20 171.665 19.5 171.665 18.84V18.5H169.405V19.1C169.405 20.68 170.705 21.92 172.245 21.92H176.285ZM188.202 9.14C188.842 9.14 189.302 9.6 189.302 10.24V11.54H183.762V10.3C183.762 9.64 184.262 9.14 184.902 9.14H188.202ZM188.722 18C190.262 18 191.562 16.88 191.562 15.3V14.58H189.302V14.86C189.302 15.52 188.782 16.02 188.142 16.02H184.902C184.262 16.02 183.762 15.52 183.762 14.86V13.32H191.562V9.94C191.562 8.4 190.342 7.16 188.782 7.16H184.302C182.742 7.16 181.482 8.42 181.482 10V15.16C181.482 16.72 182.742 18 184.302 18H188.722ZM196.229 9.86C196.229 9.46 196.549 9.18 196.929 9.18H201.329V7.16H197.909L196.229 8.52V7.16H193.929V18H196.229V9.86Z"
            fill="#FEFEFF"
          />
        </svg>
        <Flex alignItems="center" gap="2">
          <GitHubIcon />
          {isWalletConnected && (
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    ml={2}
                    variant="outline"
                    colorScheme="gray"
                    sx={{ '> span': { display: 'flex', alignItems: 'center' } }}
                  >
                    {icon}
                    <>
                      <Text variant="nav" fontSize="sm" fontWeight={700} ml={1.5} mr={2}>
                        {name}
                      </Text>
                      {isOpen ? (
                        <ChevronUpIcon color="cyan" />
                      ) : (
                        <ChevronDownIcon color="cyan.500" />
                      )}
                    </>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => switchNetwork(1)}>
                      <EthereumIcon />
                      <Text variant="nav" ml={2}>
                        Ethereum Mainnet
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(5)}>
                      <EthereumIcon />
                      <Text variant="nav" ml={2}>
                        Goerli
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(10)}>
                      <OptimismIcon />
                      <Text variant="nav" ml={2}>
                        Optimism
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(420)}>
                      <OptimismIcon />
                      <Text variant="nav" ml={2}>
                        Optimism Goerli
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={() => switchNetwork(84531)}>
                      <BaseIcon />
                      <Text variant="nav" ml={2}>
                        Base Goerli
                      </Text>
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          )}

          {isWalletConnected ? (
            <Button onClick={disconnect}>{shortAddress(wallet?.address || '')}</Button>
          ) : (
            <Button onClick={() => onboard.connectWallet()}>Connect Wallet</Button>
          )}
        </Flex>
      </Flex>
      <Divider borderColor="gray.900" />
    </Flex>
  );
};
