import PropTypes from 'prop-types';

type EPriceSize = 'default' | 'medium';

export interface IPrice {
	count: number;
	size?: EPriceSize;
}

export const pricePropTypes = {
	count: PropTypes.number.isRequired,
	size: PropTypes.oneOf([
		'default',
		'medium',
	]) as PropTypes.Requireable<EPriceSize>,
};
