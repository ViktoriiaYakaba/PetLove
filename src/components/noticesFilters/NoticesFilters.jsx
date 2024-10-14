import React, { useEffect, useState, useCallback, useMemo } from 'react';
import style from './NoticesFilters.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import SvgIcon from '../../icon/SvgIcon';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { selectCategories, selectCities, selectPetSex, selectPetTypes, selectSortWord } from '../../redux/notices/selectors';
import { fetchCategories, fetchPetSex, fetchPetType, fetchCities } from '../../redux/notices/operations';
import { changeSexValue, changeSortWord } from '../../redux/notices/slice';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

const buildLinkClass = (key, values, value) => {
    return clsx(style.radioButton, values[key] === value && style.active);
};

const NoticesFilters = ({
    searchTerm,
    setSearchTerm,
    onSearchSubmit,
    onCategoryChange,
    onPetSexChange,
    onSpeciesChange,
    onLocationChange,
    onSortChange,
}) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories) || [];
    const petSex = useSelector(selectPetSex) || [];
    const petTypes = useSelector(selectPetTypes) || [];
    const cities = useSelector(selectCities) || [];
    const sortWord = useSelector(selectSortWord);

    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [isOpenGenders, setIsOpenGenders] = useState(false);
    const [isOpenTypes, setIsOpenTypes] = useState(false);
    const [category, setCategory] = useState('');
    const [sex, setSex] = useState('');
    const [currentCity, setCurrentCity] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [sortOption, setSortOption] = useState('popular');

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    useEffect(() => {
        if (!categories.length) dispatch(fetchCategories());
        if (!petSex.length) dispatch(fetchPetSex());
        if (!petTypes.length) dispatch(fetchPetType());
        if (!cities.length) dispatch(fetchCities());
    }, [dispatch, categories.length, petSex.length, petTypes.length, cities.length]);

    useEffect(() => {
        setSortOption(sortWord);
    }, [sortWord]);

    const handleSelect = (value, callback) => {
        const selectedValue = value === 'Show All' ? '' : value;
        callback(selectedValue);
        setIsOpenCategories(false);
        setIsOpenGenders(false);
        setIsOpenTypes(false);
    };

    const handleSearchSubmit = useCallback((e) => {
        e.preventDefault();
        onSearchSubmit(searchTerm);
    }, [onSearchSubmit, searchTerm]);

    const clearSearch = () => {
        setSearchTerm('');
        onSearchSubmit('');
    };

    const handleLocationSubmit = useCallback((e) => {
        e.preventDefault();
        onLocationChange(currentCity);
    }, [onLocationChange, currentCity]);

    const filteredCities = useMemo(() => {
        return cities.filter(city =>
            `${city.stateEn}, ${city.cityEn}`.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [cities, inputValue]);

    const handleSelectCity = (city) => {
        setCurrentCity(city.cityEn);
        setInputValue('');
        onLocationChange(city._id);
    };

    const handleSelectCategory = (value) => handleSelect(value, (val) => {
        setCategory(val);
        onCategoryChange(val);
    });

    const handleSelectGender = (value) => handleSelect(value, (val) => {
        setSex(val);
        onPetSexChange(val);
        if (val !== 'Show All') dispatch(changeSexValue(val));
    });

    const handleSelectType = (value) => handleSelect(value, (val) => {
        setCategory(val);
        onSpeciesChange(val);
    });

    const handleSortChange = (value) => {
        console.log("Sorting by:", value); 
        setSortOption(value);
        onSortChange(value);
        dispatch(changeSortWord(value));
    };

    return (
        <div className={style.container}>
            <div className={style.filters}>
                <ul className={style.list}>
                    <li className={style.listItem}>
                        <form className={style.searchForm} onSubmit={handleSearchSubmit}>
                            <div className={style.inputWrapper}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search"
                                    className={style.searchInput}
                                />
                                {searchTerm && (
                                    <button type="button" className={style.clearButton} onClick={clearSearch}>
                                        <SvgIcon icon="x" width="20" height="20" />
                                    </button>
                                )}
                                <button type="submit" className={style.searchButton}>
                                    <SvgIcon icon="search" width="20" height="20" />
                                </button>
                            </div>
                        </form>
                    </li>

    
                    <li className={style.listItem}>
                        <div className={style.filterBox}>
                            <div className={style.inputBoxStyled} onClick={() => setIsOpenCategories(!isOpenCategories)}>
                                {category || "Category"}
                                <button type="button" className={style.openSelectBtn}>
                                    {isOpenCategories ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                </button>
                                <ul className={isOpenCategories ? style.dropdownListActive : style.dropdownListHidden}>
                                    <li
                                        key="show-all"
                                        onClick={() => handleSelectCategory('Show All')}
                                        style={{ cursor: 'pointer', color: 'orange', fontWeight: 'bold', padding: 5 }}
                                    >
                                        Show All
                                    </li>
                                    {categories.map((cat) => (
                                        <li key={cat} onClick={() => handleSelectCategory(cat)} style={{ cursor: 'pointer', padding: 5 }}>
                                            {capitalize(cat)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>

             
                    <li className={style.listItem}>
                        <div className={style.filterBox}>
                            <div className={style.inputBoxStyled} onClick={() => setIsOpenGenders(!isOpenGenders)}>
                                {sex || "By gender"}
                                <button type="button" className={style.openSelectBtn}>
                                    {isOpenGenders ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                </button>
                                <ul className={isOpenGenders ? style.dropdownListActive : style.dropdownListHidden}>
                                    <li
                                        key="show-all"
                                        onClick={() => handleSelectGender('Show All')}
                                        style={{ cursor: 'pointer', color: 'orange', fontWeight: 'bold', padding: 5 }}
                                    >
                                        Show All
                                    </li>
                                    {petSex.map((gender) => (
                                        <li key={gender} onClick={() => handleSelectGender(gender)} style={{ cursor: 'pointer', padding: 5 }}>
                                            {capitalize(gender)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>

              
                    <li className={style.listItem}>
                        <div className={style.filterBoxType}>
                            <div className={style.inputBoxStyledType} onClick={() => setIsOpenTypes(!isOpenTypes)}>
                                {"By type"}
                                <button type="button" className={style.openSelectBtn}>
                                    {isOpenTypes ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                </button>
                                <ul className={isOpenTypes ? style.dropdownListActiveType : style.dropdownListHiddenType}>
                                    <li
                                        key="show-all"
                                        onClick={() => handleSelectType('Show All')}
                                        style={{ cursor: 'pointer', color: 'orange', fontWeight: 'bold', padding: 5 }}
                                    >
                                        Show All
                                    </li>
                                    {petTypes.map((type) => (
                                        <li key={type} onClick={() => handleSelectType(type)} style={{ cursor: 'pointer', padding: 5 }}>
                                            {capitalize(type)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>

              
                    <li className={style.listItem}>
                        <form className={style.searchFormLocation} onSubmit={handleLocationSubmit}>
                            <div className={style.inputWrapperLocation}>
                                <input
                                    type="text"
                                    value={currentCity}
                                    onChange={(e) => {
                                        setCurrentCity(e.target.value);
                                        setInputValue(e.target.value);
                                    }}
                                    placeholder="Location"
                                    className={style.searchInputLocation}
                                />
                                {currentCity && (
                                    <button type="button" className={style.clearButtonLocation} onClick={() => {
                                        setCurrentCity('');
                                        setInputValue('');
                                    }}>
                                        <SvgIcon icon="x" width="20" height="20" />
                                    </button>
                                )}
                                <button type="submit" className={style.searchButtonLocation}>
                                    <SvgIcon icon="search" width="20" height="20" />
                                </button>
                            </div>
                        </form>
                        {inputValue && filteredCities.length > 0 && (
                            <ul className={style.dropdownListActiveLocation}>
                                {filteredCities.map((city) => (
                                    <li key={city.id} onClick={() => handleSelectCity(city)} style={{ cursor: 'pointer', padding: 5 }}>
                                        {`${city.stateEn}, ${city.cityEn}`}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
            
            <div className={style.containerRadio}>
                 <Formik
                    initialValues={{ sortOption }}
                    enableReinitialize
                    onSubmit={() => {}}
                >
                    {({ values, setFieldValue }) => (
                        <Form className={style.radioForm}>
                            <div className={style.radioButtons}>
                                {['popular', 'unpopular', 'cheap', 'expensive'].map((option) => (
                                    <label className={buildLinkClass('sortOption', values, option)} key={option}>
                                        <Field 
                                            type="radio" 
                                            name="sortOption" 
                                            value={option} 
                                            onChange={() => {
                                                setFieldValue("sortOption", option);
                                                handleSortChange(option); 
                                            }} 
                                        />
                                        <span className={style.radioLabel}>
                                            {option}
                                            {values.sortOption === option && (
                                                <button 
                                                    type="button" 
                                                    className={style.buttonTogle} 
                                                    onClick={() => {
                                                        setFieldValue('sortOption', ''); 
                                                        handleSortChange(''); 
                                                    }}
                                                >
                                                    <SvgIcon icon='cancel' width="18" height="18" />
                                                </button>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default NoticesFilters;
