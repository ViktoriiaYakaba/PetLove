import React, { useState, useEffect } from 'react';
import style from './NoticesFilters.module.scss';
import SvgIcon from '../../icon/SvgIcon';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCities, fetchPetSex, fetchPetType } from '../../redux/notices/operations';
import { selectCategories, selectCities, selectPetSex, selectPetTypes, selectSexValue } from '../../redux/notices/selectors';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

 const buildLinkClass = (key, values) => {
    return clsx(style.radioButton, values[key] && style.active);
  };


const NoticesFilters = () => {
    const dispatch = useDispatch();
    const cities = useSelector(selectCities);
    const gender = useSelector(selectSexValue);


    const [searchTerm, setSearchTerm] = useState('');
    const [currentCity, setCurrentCity] = useState('');
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [category, setCategory] = useState('');
    const [isOpenGenders, setIsOpenGenders] = useState(false);
    const [isOpenTypes, setIsOpenTypes] = useState(false);
    const [sortOption, setSortOption] = useState('popularity');

    const categories = ["Found", "Free", "Lost", "Sell"];
    const petSex = ["Unknown", "Female", "Male", "Multiple"];
    const petTypes =["Dog", "Cat", "Monkey", "Bird", "Snake", "Turtle", "Lizard", "Frog", "Fish", "Ants", "Bees", "Butterfly", "Spider", "Scorpion"]

    useEffect(() => {
        if (!categories) {
            dispatch(fetchCategories());
        }
        if (!petSex) {
            dispatch(fetchPetSex());
        }
        if (!petTypes) {
            dispatch(fetchPetType());
        }
    }, [dispatch, categories, petSex, petTypes]);

    useEffect(() => {
        if (!cities) {
            dispatch(fetchCities());
        }
    }, [dispatch, cities]);

    const options = cities?.map((city) => ({
        label: `${city.stateEn}, ${city.cityEn}`,
        value: city._id,
    })).filter((city) => city.label.includes(currentCity ? currentCity : "Krym"));

  

    const handleLocation = (e) => {
        e.preventDefault();
        console.log(currentCity);
        
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleSelectCategory = (value) => {
        if (value === 'Show All') {
            setCategory('');
        } else if (value !== category) {
            setCategory(value);
        }
        setIsOpenCategories(false);
    };

    const handleSelectGender = (value) => {
        if (value === 'Show All') {
            dispatch(changeSexValue(''));
        } else if (value !== gender) {
            dispatch(changeSexValue(value));
        }
        setIsOpenGenders(false);
    };

    const handleSelectType = (value) => {
        if (value !== category) {
            setIsOpenTypes(false);
            setCategory(value);
        }
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
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className={style.listItem}>
                        <div className={style.filterBox}>
                            <div className={style.inputBoxStyled} onClick={() => setIsOpenGenders(!isOpenGenders)}>
                                { "By gender"}
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
                                    {petSex.map((sex) => (
                                        <li key={sex} onClick={() => handleSelectGender(sex)} style={{ cursor: 'pointer', padding: 5 }}>
                                            {sex}
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
                                            {type}
                                        </li>
                                    ))}

                                </ul>
                                                
                                        </div>
                                            
                                    </div>
                    </li>
                    
                    <li className={style.listItem}>
              <form className={style.searchForm} onSubmit={handleLocation}>
                            <div className={style.inputWrapper}>
                                <input
                                    type="text"
                                    value={currentCity}
                                    onChange={(e) => setCurrentCity(e.target.value)}
                                    placeholder="Location"
                                    className={style.searchInput}
                                />
                                {currentCity && (
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
                    
                </ul>
            </div>
            
            <div className={style.radio}>
   <Formik
        initialValues={{ sortOption: '' }}
        onSubmit={(values) => console.log('Selected option:', values.sortOption)}
         >
        {() => (
    <Form className={style.radioForm}>
                                    <div className={style.radioButtons}>
                                        <label className={style.radioButton}>
                                            <Field type="radio" name="sortOption" value="popularity" />
                                            <span className={style.radioLabel}>Popularity</span>
                                        </label>
                                        <label className={style.radioButton}>
                                            <Field type="radio" name="sortOption" value="unpopular" />
                                            <span className={style.radioLabel}>Unpopular</span>
                                        </label>
                                        <label className={style.radioButton}>
                                            <Field type="radio" name="sortOption" value="cheap" />
                                            <span className={style.radioLabel}>Cheap</span>
                                        </label>
                                        <label className={style.radioButton}>
                                            <Field type="radio" name="sortOption" value="expensive" />
                                            <span className={style.radioLabel}>Expensive</span>
                                        </label>
                                    </div> 
                                </Form>
                            )}
                        </Formik>
            </div>

            
        </div>
    );
};

export default NoticesFilters;
