import { FC, useContext } from 'react';
import { Flex, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { currency } from '@snx-v3/format';
import { LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import Wei, { wei } from '@synthetixio/wei';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';
import { calculateCRatio } from '@snx-v3/calculations';

const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  formatFn: (val: Wei) => string;
}> = ({ formatFn, value, newValue, hasChanges }) => {
  return (
    <Flex
      gap={1}
      color="gray.50"
      fontSize="2xl"
      fontWeight="800"
      alignItems="center"
      lineHeight="32px"
    >
      <Text>{formatFn(value)}</Text>
      {hasChanges && !value.eq(newValue) ? (
        <Text>
          <ArrowForwardIcon /> {formatFn(newValue)}
        </Text>
      ) : null}
    </Flex>
  );
};

export const ManageStatsUi: FC<{
  liquidityPosition?: LiquidityPosition;
  collateralType?: CollateralType;
  newCratio: Wei;
  newCollateralAmount: Wei;
  newDebt: Wei;
  cRatio: Wei;
  collateralValue: Wei;
  hasChanges: boolean;
}> = ({
  liquidityPosition,
  collateralType,
  collateralValue,
  cRatio,
  newCollateralAmount,
  newCratio,
  newDebt,
  hasChanges,
}) => {
  // const performanceLast24h = wei(0.25);
  // const isPositive = performanceLast24h.gte(0);
  return (
    <Flex direction="column">
      <BorderBox py={4} px={6} flexDirection="column" bg="navy.700" mb={4}>
        <Flex alignItems="center" mb="4px">
          <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
            COLLATERAL
          </Text>
          <Tooltip
            label="Your total amount of collateral locked in this pool."
            textAlign="start"
            py={2}
            px={3}
          >
            <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
              <InfoIcon color="white" height="9px" width="9px" />
            </Flex>
          </Tooltip>
        </Flex>
        {liquidityPosition && collateralType ? (
          <>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              data-testid="manage stats collateral"
            >
              <ChangeStat
                value={liquidityPosition.collateralAmount}
                newValue={newCollateralAmount}
                formatFn={(val: Wei) => `${currency(val)} ${collateralType.displaySymbol}`}
                hasChanges={hasChanges}
              />
              <Text
                fontWeight="400"
                color="gray.500"
                fontSize="md"
                fontFamily="heading"
                lineHeight="24px"
              >
                {currency(liquidityPosition.collateralValue, {
                  currency: 'USD',
                  style: 'currency',
                })}
              </Text>
            </Flex>
            <Text fontWeight="400" color="gray.500" fontSize="xs">
              Current Value:{' '}
              {currency(collateralValue, {
                currency: 'USD',
                style: 'currency',
              })}
            </Text>
          </>
        ) : (
          <Skeleton width="100%">Lorem ipsum (this wont be displayed) </Skeleton>
        )}
      </BorderBox>
      <BorderBox
        py={4}
        px={6}
        flexDirection="row"
        bg="navy.700"
        justifyContent="space-between"
        mb={4}
      >
        <Flex flexDirection="column" justifyContent="space-between" width="100%">
          <Flex alignItems="center" mb="4px">
            <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px">
              DEBT
            </Text>
            <Tooltip label="Your minted debt balance." textAlign="start" py={2} px={3}>
              <Flex height="12px" width="12px" ml="4px" alignItems="center" justifyContent="center">
                <InfoIcon color="white" height="9px" width="9px" />
              </Flex>
            </Tooltip>
          </Flex>
          <Flex width="100%" data-testid="manage stats debt">
            {liquidityPosition && collateralType ? (
              <ChangeStat
                // TODO, need a function to burn to target so dust debt not left over
                value={liquidityPosition.debt.lt(0.01) ? wei(0) : liquidityPosition.debt}
                newValue={newDebt}
                formatFn={(val: Wei) =>
                  currency(val, {
                    currency: 'USD',
                    style: 'currency',
                    maximumFractionDigits: 2,
                  })
                }
                hasChanges={hasChanges}
              />
            ) : (
              <Skeleton width="100%">Lorem ipsum (this wont be displaye debt) </Skeleton>
            )}
          </Flex>
        </Flex>
        {/* TODO: Historical Debt Performance */}
        {/* <Flex flexDirection="column" alignItems="flex-end" data-testid="manage stats collateral">
          <Text fontFamily="heading" color="gray.50" fontSize="16px" fontWeight={700}>
            Performance Last 24h
          </Text>
          <Flex>
            <Text
              fontWeight="800"
              color={isPositive ? 'green.500' : 'red.500'}
              fontSize="24px"
              fontFamily="heading"
              lineHeight="32px"
            >
              {isPositive ? '+' : ''}
              {currency(wei(0.23), {
                currency: 'USD',
                style: 'currency',
              })}
            </Text>
            <Text
              fontWeight="600"
              color={isPositive ? 'green.500' : 'red.500'}
              fontSize="18px"
              fontFamily="heading"
              lineHeight="28px"
              ml={1}
            >
              {isPositive ? '+' : '-'}
              {currency(wei(0.23), {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Flex>
        </Flex> */}
      </BorderBox>
      <BorderBox py={4} px={6} flexDirection="column" bg="navy.700" my={0} mb={4}>
        <Text color="gray.500" fontSize="xs" fontFamily="heading" lineHeight="16px" mb="4px">
          C-RATIO
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          data-testid="manage stats collateral"
        >
          {liquidityPosition && collateralType ? (
            <>
              <ChangeStat
                // TODO, need a function to burn to target so dust debt not left over
                value={cRatio.lt(0.01) || cRatio.gt(50000) ? wei(0) : cRatio}
                newValue={newCratio}
                formatFn={(val: Wei) =>
                  currency(val, {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
                hasChanges={hasChanges}
              />
              <Text
                fontWeight="400"
                color="gray.500"
                fontSize="md"
                fontFamily="heading"
                lineHeight="24px"
              >
                Minimum{' '}
                {currency(collateralType.issuanceRatioD18, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </>
          ) : (
            <Skeleton width="100%">Lorem ipsum (this wont be displayed) </Skeleton>
          )}
        </Flex>
      </BorderBox>
    </Flex>
  );
};

export const ManageStats = ({ liquidityPosition }: { liquidityPosition?: LiquidityPosition }) => {
  const params = useParams();
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const { data: collateralType } = useCollateralType(params.collateralSymbol);

  const collateralValue = liquidityPosition?.collateralValue || wei(0);

  const cRatio = calculateCRatio(liquidityPosition?.debt || wei(0), collateralValue);

  const { newCRatio, newCollateralAmount, newDebt, hasChanges } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralPrice: liquidityPosition?.collateralPrice,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });

  return (
    <ManageStatsUi
      hasChanges={hasChanges}
      newCratio={newCRatio}
      newDebt={newDebt}
      newCollateralAmount={newCollateralAmount}
      liquidityPosition={liquidityPosition}
      collateralType={collateralType}
      cRatio={cRatio}
      collateralValue={collateralValue}
    />
  );
};
