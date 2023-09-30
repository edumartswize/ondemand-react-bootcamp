import React from 'react';
import { render, screen } from '@testing-library/react';
import Banners from './BannerSlider';
import featuredBanners from '../../data/featured-banners.json';
import { useFeaturedBanners } from '../../utils/hooks/useFeaturedBanners';

jest.mock('../../utils/hooks/useFeaturedBanners');

describe('Test Banner Slider', () => {
    beforeEach(() => {
        useFeaturedBanners.mockReturnValue({
            data: featuredBanners,
            isLoading: false,
        });
    });

    test('Render Banner Slider Data', async () => {
        render(<Banners />);
    
        expect(await screen.findByRole("img")).toBeInTheDocument();
    });
});
