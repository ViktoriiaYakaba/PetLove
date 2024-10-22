import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../title/Title';
import NoticesFilters from '../noticesFilters/NoticesFilters';
import style from './Notices.module.scss';
import Pagination from '../pagination/Pagination';
import { fetchAllNotices } from '../../redux/notices/operations';
import NoticesList from '../noticesList/NoticesList';
import {
    selectLastPage,
    selectErrorNotices,
    selectNotices,
    selectIsLoading,
} from '../../redux/notices/selectors';

const Notices = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const lastPage = useSelector(selectLastPage);
    const noticesError = useSelector(selectErrorNotices);
    const noticesList = useSelector(selectNotices);
    const isLoading = useSelector(selectIsLoading);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [sex, setSex] = useState('');
    const [species, setSpecies] = useState('');
    const [locationId, setLocationId] = useState(null);
    const [sortWord, setSortWord] = useState('popular');

    useEffect(() => {
        dispatch(fetchAllNotices({
            page,
            keyword: searchTerm,
            category,
            sex,
            species,
            locationId,
            byPopularity: sortWord
        }));
    }, [dispatch, searchTerm, page, category, sex, species, locationId, sortWord]);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, category, sex, species, sortWord]);

    if (isLoading) return <div>Loading...</div>;
    if (noticesError) return <div>Error fetching notices: {noticesError}</div>;

    const handleSearchSubmit = (keyword) => {
        setSearchTerm(keyword);
    };

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handlePetSexChange = (selectedPetSex) => {
        setSex(selectedPetSex);
    };

    const handleSpeciesChange = (selectedSpecies) => {
        setSpecies(selectedSpecies);
    };

    const handleLocationChange = (selectedLocation) => {
        setLocationId(selectedLocation);
        console.log('Selected location:', selectedLocation);
    };

    const handleSortChange = (selectedSortWord) => {
        setSortWord(selectedSortWord);
    };

    return (
        <div className={style.container}>
            <div className={style.containerTitle}>
                <Title />
            </div>
            <div className={style.containerFilters}>
                <NoticesFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearchSubmit={handleSearchSubmit}
                    onCategoryChange={handleCategoryChange}
                    onPetSexChange={handlePetSexChange}
                    onSpeciesChange={handleSpeciesChange}
                    onLocationChange={handleLocationChange}
                    onSortChange={handleSortChange}
                />
            </div>
            <div>
                <NoticesList notices={noticesList} />
            </div>
            <div>
                <Pagination setPage={setPage} page={page} lastPage={lastPage} />
            </div>
        </div>
    );
};

export default Notices;
