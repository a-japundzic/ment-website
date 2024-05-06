import React, {useState, useEffect} from 'react'
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import Select from 'react-select'

import LOGO from '../assets/logo.png'
import IMG from '../assets/mentorEducation.png'

import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { listMenteeProfiles } from '../graphql/queries';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';

const client = generateClient();

const Education = () => {
    // ************************* Fetch current user profile if it exists, and define appropriate variables ************************
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [state, setAppState] = useAppState();

    // Fetches the username of the current authenticated user
    async function currentAuthenticatedUser() {
        try {
            const { username } = await getCurrentUser();
            setUsername(username);
        } catch (err) {
            console.log(err);
        }
    }

    // On every refresh, fetch the username of the current authenticated user
    useEffect(() => {
        currentAuthenticatedUser();
    }, [username]);


    // Fetches the current user based off the username given above
    const {
        data: userProfile,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const variables = {
                filter: {
                    owner: {
                        contains: username
                    }
                }
            };

            const response = await client.graphql({
                query: listMenteeProfiles,
                variables: variables
            });

            let completeProfile = response?.data?.listMenteeProfiles?.items;

            if (!completeProfile) return null;
        
            return completeProfile;
        }
    })

    // ****************************************************************

    // Handles the submission of the form
    const { handleSubmit, 
        control,
        formState: { errors },
        reset
    } = useForm({defaultValues: state, criteriaMode: "all" });

    const saveData = (data) => {
        // set state
        setAppState({...state, ...data });

        // If record exists, update, else, create a new one
        updateRecord.mutate(data);
    };

    // Updates existing record
    const updateRecord = useMutation({
        mutationFn: async (data) => {
            try {
                const menteeDetails = {
                    id: userProfile[0].id,
                    schoolName: data.menteeUniversity.value,
                    programOfStudy: data.menteeProgram.value,
                    educationLevel: data.menteeEducationalLevel.value,
                    graduationYear: data.menteeGraduationYear.value,
                };
            
                const updateMentee = await client.graphql({
                    query: mutations.updateMenteeProfile,
                    variables: { input: menteeDetails }
                });
            } catch (error) {
                console.log("Error updating profile", error);
            }
        },
        onSuccess:  () => {
            navigate("/menteePreferences", {replace: true});
        },
        onMutate: () => {
            setLoading(true);
        }
    })

    // If the page is refreshed, and state is cleared, set default values from the query (this took forever, but got it done)
    useEffect(() => {
        if (isSuccess && !state && userProfile[0].length > 0) {
            const resetMenteeUniversity = educationalInstitution.find(op => {
                return op.value === userProfile[0].schoolName
            })

            const resetMenteeProgram = program.find(op => {
                return op.value === userProfile[0].programOfStudy
            })

            const resetMenteeEducationalLevel = educationLevel.find(op => {
                return op.value === userProfile[0].educationLevel
            })

            const resetMenteeGraduationYear = graduationYear.find(op => {
                return op.value === userProfile[0].graduationYear
            })


            reset({
                menteeUniversity: resetMenteeUniversity,
                menteeProgram: resetMenteeProgram,
                menteeEducationalLevel: resetMenteeEducationalLevel,
                menteeGraduationYear: resetMenteeGraduationYear,
            })
        }
    }, [])

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: 42,
            borderColor: '#E9ECEF',
            boxShadow: state.isFocused ? '0 0 0px 4px #C2DAFF' : 'none',
        })
    };

    const educationalInstitution = [
        { value: 'N/A', label: 'N/A' },
        { value: 'Other', label: 'Other' },
        { value: 'Acadia University', label: 'Acadia University' },
        { value: 'Algoma University', label: 'Algoma University' },
        { value: 'Ambrose University', label: 'Ambrose University' },
        { value: 'Aurora College', label: 'Aurora College' },
        { value: 'Bishop\'s University', label: 'Bishop\'s University' },
        { value: 'Brandon University', label: 'Brandon University' },
        { value: 'British Columbia Institute of Technology', label: 'British Columbia Institute of Technology' },
        { value: 'Brock University', label: 'Brock University' },
        { value: 'Burman University', label: 'Burman University' },
        { value: 'Campion College at the University of Regina', label: 'Campion College at the University of Regina' },
        { value: 'Canadian Mennonite University', label: 'Canadian Mennonite University' },
        { value: 'Cape Breton University', label: 'Cape Breton University' },
        { value: 'Capilano University', label: 'Capilano University' },
        { value: 'Carleton University', label: 'Carleton University' },
        { value: 'College of the North Atlantic', label: 'College of the North Atlantic' },
        { value: 'Collège Universitaire Dominicain', label: 'Collège Universitaire Dominicain' },
        { value: 'Concordia University', label: 'Concordia University' },
        { value: 'Concordia University of Edmonton', label: 'Concordia University of Edmonton' },
        { value: 'Crandall University', label: 'Crandall University' },
        { value: 'Dalhousie University', label: 'Dalhousie University' },
        { value: 'École de Technologie Supérieure', label: 'École de Technologie Supérieure' },
        { value: 'École Nationale d\'Administration Publique', label: 'École Nationale d\'Administration Publique' },
        { value: 'École Polytechnique de Montréal', label: 'École Polytechnique de Montréal' },
        { value: 'Emily Carr University of Art and Design', label: 'Emily Carr University of Art and Design' },
        { value: 'First Nations University of Canada', label: 'First Nations University of Canada' },
        { value: 'HEC Montréal', label: 'HEC Montréal' },
        { value: 'Kingswood University', label: 'Kingswood University' },
        { value: 'Kwantlen Polytechnic University', label: 'Kwantlen Polytechnic University' },
        { value: 'Lakehead University', label: 'Lakehead University' },
        { value: 'Laurentian University', label: 'Laurentian University' },
        { value: 'Luther College at the University of Regina', label: 'Luther College at the University of Regina' },
        { value: 'MacEwan University', label: 'MacEwan University' },
        { value: 'McGill University', label: 'McGill University' },
        { value: 'McMaster University', label: 'McMaster University' },
        { value: 'Memorial University of Newfoundland', label: 'Memorial University of Newfoundland' },
        { value: 'Mount Allison University', label: 'Mount Allison University' },
        { value: 'Mount Royal University', label: 'Mount Royal University' },
        { value: 'Mount Saint Vincent University', label: 'Mount Saint Vincent University' },
        { value: 'Nicola Valley Institute of Technology', label: 'Nicola Valley Institute of Technology' },
        { value: 'Nipissing University', label: 'Nipissing University' },
        { value: 'Northern Alberta Institute of Technology', label: 'Northern Alberta Institute of Technology' },
        { value: 'NSCAD University', label: 'NSCAD University' },
        { value: 'OCAD University', label: 'OCAD University' },
        { value: 'Ontario Tech University', label: 'Ontario Tech University' },
        { value: 'Queen\'s University', label: 'Queen\'s University' },
        { value: 'Quest University Canada', label: 'Quest University Canada' },
        { value: 'Redeemer University', label: 'Redeemer University' },
        { value: 'Royal Military College of Canada', label: 'Royal Military College of Canada' },
        { value: 'Royal Roads University', label: 'Royal Roads University' },
        { value: 'Saint Mary\'s University', label: 'Saint Mary\'s University' },
        { value: 'Simon Fraser University', label: 'Simon Fraser University' },
        { value: 'Southern Alberta Institute of Technology', label: 'Southern Alberta Institute of Technology' },
        { value: 'St Mary\'s University', label: 'St Mary\'s University' },
        { value: 'St. Francis Xavier University', label: 'St. Francis Xavier University' },
        { value: 'St. Stephen\'s University', label: 'St. Stephen\'s University' },
        { value: 'St. Thomas More College', label: 'St. Thomas More College' },
        { value: 'St. Thomas University', label: 'St. Thomas University' },
        { value: 'The King\'s University', label: 'The King\'s University' },
        { value: 'The University of British Columbia', label: 'The University of British Columbia' },
        { value: 'The University of Winnipeg', label: 'The University of Winnipeg' },
        { value: 'Thompson Rivers University', label: 'Thompson Rivers University' },
        { value: 'Toronto Metropolitan University', label: 'Toronto Metropolitan University' },
        { value: 'Trent University', label: 'Trent University' },
        { value: 'Trinity Western University', label: 'Trinity Western University' },
        { value: 'Université de Hearst', label: 'Université de Hearst' },
        { value: 'Université de Moncton', label: 'Université de Moncton' },
        { value: 'Université de Montréal', label: 'Université de Montréal' },
        { value: 'Université de Saint-Boniface', label: 'Université de Saint-Boniface' },
        { value: 'Université de Sherbrooke', label: 'Université de Sherbrooke' },
        { value: 'Université du Québec', label: 'Université du Québec' },
        { value: 'Université du Québec à Chicoutimi', label: 'Université du Québec à Chicoutimi' },
        { value: 'Université du Québec à Montréal', label: 'Université du Québec à Montréal' },
        { value: 'Université du Québec à Rimouski', label: 'Université du Québec à Rimouski' },
        { value: 'Université du Québec à Trois-Rivières', label: 'Université du Québec à Trois-Rivières' },
        { value: 'Université du Québec en Abitibi-Témiscamingue', label: 'Université du Québec en Abitibi-Témiscamingue' },
        { value: 'Université du Québec en Outaouais', label: 'Université du Québec en Outaouais' },
        { value: 'Université Laval', label: 'Université Laval' },
        { value: 'Université Sainte-Anne', label: 'Université Sainte-Anne' },
        { value: 'University Canada West', label: 'University Canada West' },
        { value: 'University of Alberta', label: 'University of Alberta' },
        { value: 'University of Calgary', label: 'University of Calgary' },
        { value: 'University of Guelph', label: 'University of Guelph' },
        { value: 'University of King\'s College', label: 'University of King\'s College' },
        { value: 'University of Lethbridge', label: 'University of Lethbridge' },
        { value: 'University of Manitoba', label: 'University of Manitoba' },
        { value: 'University of New Brunswick', label: 'University of New Brunswick' },
        { value: 'University of Northern British Columbia', label: 'University of Northern British Columbia' },
        { value: 'University of Ottawa', label: 'University of Ottawa' },
        { value: 'University of Prince Edward Island', label: 'University of Prince Edward Island' },
        { value: 'University of Regina', label: 'University of Regina' },
        { value: 'University of Saskatchewan', label: 'University of Saskatchewan' },
        { value: 'University of the Fraser Valley', label: 'University of the Fraser Valley' },
        { value: 'University of Toronto', label: 'University of Toronto' },
        { value: 'University of Victoria', label: 'University of Victoria' },
        { value: 'University of Waterloo', label: 'University of Waterloo' },
        { value: 'University of Windsor', label: 'University of Windsor' },
        { value: 'Vancouver Island University', label: 'Vancouver Island University' },
        { value: 'Western University', label: 'Western University' },
        { value: 'Wilfrid Laurier University', label: 'Wilfrid Laurier University' },
        { value: 'York University', label: 'York University' },
        { value: 'Yorkville University', label: 'Yorkville University' },
    ]

    const program = [
        { value: 'N/A', label: 'N/A' },
        { value: 'Other', label: 'Other' },
        { value: 'Nursing', label: 'Nursing' },
        { value: 'Liberal Arts', label: 'Liberal Arts' },
        { value: 'Business Administration', label: 'Business Administration' },
        { value: 'General Studies', label: 'General Studies' },
        { value: 'Psychology', label: 'Psychology' },
        { value: 'Biology', label: 'Biology' },
        { value: 'Communications', label: 'Communications' },
        { value: 'Accounting', label: 'Accounting' },
        { value: 'Medical Assistant', label: 'Medical Assistant' },
        { value: 'Social Work', label: 'Social Work' },
        { value: 'Cosmetology', label: 'Cosmetology' },
        { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Criminal Justice', label: 'Criminal Justice' },
        { value: 'Licensed Practical Nurse (LPN)', label: 'Licensed Practical Nurse (LPN)' },
        { value: 'Advertising and Marketing', label: 'Advertising and Marketing' },
        { value: 'Welding', label: 'Welding' },
        { value: 'Nursing Assistant', label: 'Nursing Assistant' },
        { value: 'Political Science', label: 'Political Science' },
        { value: 'Bookkeeping', label: 'Bookkeeping' },
        { value: 'English', label: 'English' },
        { value: 'Elementary Education', label: 'Elementary Education' },
        { value: 'Auto Mechanic', label: 'Auto Mechanic' },
        { value: 'Law', label: 'Law' },
        { value: 'Sociology', label: 'Sociology' },
        { value: 'Educational Leadership and Administration', label: 'Educational Leadership and Administration' },
        { value: 'Sports Management', label: 'Sports Management' },
        { value: 'Early Childhood Education', label: 'Early Childhood Education' },
        { value: 'Kinesiology And Exercise Science', label: 'Kinesiology And Exercise Science' },
        { value: 'Electrical Engineering', label: 'Electrical Engineering' },
        { value: 'Economics', label: 'Economics' },
        { value: 'Education', label: 'Education' },
        { value: 'EMT and Paramedic', label: 'EMT and Paramedic' },
        { value: 'History', label: 'History' },
        { value: 'Law and Justice Administration', label: 'Law and Justice Administration' },
        { value: 'Math', label: 'Math' },
        { value: 'Healthcare Administration', label: 'Healthcare Administration' },
        { value: 'Information Technology', label: 'Information Technology' },
        { value: 'Esthetician', label: 'Esthetician' },
        { value: 'Civil Engineering', label: 'Civil Engineering' },
        { value: 'Chemistry', label: 'Chemistry' },
        { value: 'Heating and Air Conditioning (HVAC)', label: 'Heating and Air Conditioning (HVAC)' },
        { value: 'Special Education', label: 'Special Education' },
        { value: 'Public Health', label: 'Public Health' },
        { value: 'Medicine', label: 'Medicine' },
        { value: 'Social Science', label: 'Social Science' },
        { value: 'Counseling Psychology', label: 'Counseling Psychology' },
        { value: 'Curriculum and Instruction', label: 'Curriculum and Instruction' },
        { value: 'Electrician', label: 'Electrician' },
        { value: 'Information Science', label: 'Information Science' },
        { value: 'Dental Assistant', label: 'Dental Assistant' },
        { value: 'Public Administration', label: 'Public Administration' },
        { value: 'Bus and Truck Driver', label: 'Bus and Truck Driver' },
        { value: 'Human Resources', label: 'Human Resources' },
        { value: 'Pharmacy', label: 'Pharmacy' },
        { value: 'Family Practice Nurse', label: 'Family Practice Nurse' },
        { value: 'Chemical Engineering', label: 'Chemical Engineering' },
        { value: 'Sports Medicine', label: 'Sports Medicine' },
        { value: 'Computer Networking', label: 'Computer Networking' },
        { value: 'Human Services', label: 'Human Services' },
        { value: 'International Relations', label: 'International Relations' },
        { value: 'Physical Therapy', label: 'Physical Therapy' },
        { value: 'Journalism', label: 'Journalism' },
        { value: 'Organizational Leadership', label: 'Organizational Leadership' },
        { value: 'Physics', label: 'Physics' },
        { value: 'Culinary Arts', label: 'Culinary Arts' },
        { value: 'Guidance Counselor', label: 'Guidance Counselor' },
        { value: 'Information Systems', label: 'Information Systems' },
        { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
        { value: 'Massage Therapy', label: 'Massage Therapy' },
        { value: 'Fine Arts and Studio Arts', label: 'Fine Arts and Studio Arts' },
        { value: 'Music', label: 'Music' },
        { value: 'Drama and Theatre Arts', label: 'Drama and Theatre Arts' },
        { value: 'Ultrasound Technician', label: 'Ultrasound Technician' },
        { value: 'Radiology Technician', label: 'Radiology Technician' },
        { value: 'CAD', label: 'CAD' },
        { value: 'Management Science', label: 'Management Science' },
        { value: 'Anthropology', label: 'Anthropology' },
        { value: 'Physician Assistant', label: 'Physician Assistant' },
        { value: 'Nail Technician', label: 'Nail Technician' },
        { value: 'Paralegal', label: 'Paralegal' },
        { value: 'Biochemistry', label: 'Biochemistry' },
        { value: 'Family Studies', label: 'Family Studies' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Diesel Mechanic', label: 'Diesel Mechanic' },
        { value: 'Industrial Engineering', label: 'Industrial Engineering' },
        { value: 'Veterinary Assistant', label: 'Veterinary Assistant' },
        { value: 'Criminology', label: 'Criminology' },
        { value: 'International Business', label: 'International Business' },
        { value: 'Biomedical Science', label: 'Biomedical Science' },
        { value: 'Occupational Therapy', label: 'Occupational Therapy' },
        { value: 'Secondary Education', label: 'Secondary Education' },
        { value: 'Nursing Administration', label: 'Nursing Administration' },
        { value: 'Logistics and Supply Chain Management', label: 'Logistics and Supply Chain Management' },
        { value: 'Medical Insurance Coding', label: 'Medical Insurance Coding' },
        { value: 'Medical Executive Assistant', label: 'Medical Executive Assistant' },
        { value: 'Health Information and Medical Records Technology', label: 'Health Information and Medical Records Technology' },
        { value: 'Environmental Science', label: 'Environmental Science' },
        { value: 'Administrative Assistant', label: 'Administrative Assistant' },
        { value: 'Physical Education', label: 'Physical Education' },
        { value: 'Graphic Design', label: 'Graphic Design' },
        { value: 'Pharmacy Technician', label: 'Pharmacy Technician' },
        { value: 'Dental Hygienist', label: 'Dental Hygienist' },
        { value: 'Fire Science', label: 'Fire Science' },
        { value: 'Spanish Language and Literature', label: 'Spanish Language and Literature' },
        { value: 'Phlebotomy', label: 'Phlebotomy' },
        { value: 'Neuroscience', label: 'Neuroscience' },
        { value: 'Cinematography And Film', label: 'Cinematography And Film' },
        { value: 'Surgical Technologist', label: 'Surgical Technologist' },
        { value: 'Computer Programming', label: 'Computer Programming' },
        { value: 'Industrial Mechanics', label: 'Industrial Mechanics' },
        { value: 'Audiology and Speech Pathology', label: 'Audiology and Speech Pathology' },
        { value: 'Multimedia', label: 'Multimedia' },
        { value: 'Physical Therapist Assistant', label: 'Physical Therapist Assistant' },
        { value: 'Medical Insurance Biller', label: 'Medical Insurance Biller' },
        { value: 'Entrepreneurship', label: 'Entrepreneurship' },
        { value: 'Philosophy', label: 'Philosophy' },
        { value: 'Molecular Biology', label: 'Molecular Biology' },
        { value: 'Geology', label: 'Geology' },
        { value: 'International and Global Studies', label: 'International and Global Studies' },
        { value: 'Audio and Video Production', label: 'Audio and Video Production' },
        { value: 'Ministry', label: 'Ministry' },
        { value: 'Respiratory Therapy', label: 'Respiratory Therapy' },
        { value: 'Animal Science', label: 'Animal Science' },
        { value: 'Statistics', label: 'Statistics' },
        { value: 'Osteopathy', label: 'Osteopathy' },
        { value: 'Software Engineering', label: 'Software Engineering' },
        { value: 'Reading Teacher and Literacy Specialist', label: 'Reading Teacher and Literacy Specialist' },
        { value: 'Dentistry', label: 'Dentistry' },
        { value: 'Mental Health Counseling', label: 'Mental Health Counseling' },
        { value: 'Creative Writing', label: 'Creative Writing' },
        { value: 'Theology', label: 'Theology' },
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Organizational and Nonprofit Management', label: 'Organizational and Nonprofit Management' },
        { value: 'Substance Abuse and Addiction Counseling', label: 'Substance Abuse and Addiction Counseling' },
        { value: 'Aircraft Mechanic', label: 'Aircraft Mechanic' },
        { value: 'Web Design', label: 'Web Design' },
        { value: 'Interior Design', label: 'Interior Design' },
        { value: 'Public Relations', label: 'Public Relations' },
        { value: 'Operations Management', label: 'Operations Management' },
        { value: 'Design and Visual Communications', label: 'Design and Visual Communications' },
        { value: 'ESL', label: 'ESL' },
        { value: 'Industrial Technology', label: 'Industrial Technology' },
        { value: 'Medical Office Assistant', label: 'Medical Office Assistant' },
        { value: 'Manufacturing Engineering Technician', label: 'Manufacturing Engineering Technician' },
        { value: 'Athletic Training', label: 'Athletic Training' },
        { value: 'Clinical Psychology', label: 'Clinical Psychology' },
        { value: 'Real Estate', label: 'Real Estate' },
        { value: 'Engineering Management', label: 'Engineering Management' },
        { value: 'Public Policy', label: 'Public Policy' },
        { value: 'Auto Body', label: 'Auto Body' },
        { value: 'Animation', label: 'Animation' },
        { value: 'Geography', label: 'Geography' },
        { value: 'Office Management and Supervision', label: 'Office Management and Supervision' },
        { value: 'Occupational Therapy Assistant (OTA)', label: 'Occupational Therapy Assistant (OTA)' },
        { value: 'Baking And Pastry', label: 'Baking And Pastry' },
        { value: 'Nutrition', label: 'Nutrition' },
        { value: 'Nursing Science', label: 'Nursing Science' },
        { value: 'Hospital and Healthcare Facility Management', label: 'Hospital and Healthcare Facility Management' },
        { value: 'Exercise Physiology', label: 'Exercise Physiology' },
        { value: 'Child Care', label: 'Child Care' },
        { value: 'Machinist', label: 'Machinist' },
        { value: 'Child Development', label: 'Child Development' },
        { value: 'Medical Lab Technician', label: 'Medical Lab Technician' },
        { value: 'Talmudic Studies', label: 'Talmudic Studies' },
        { value: 'Carpentry', label: 'Carpentry' },
        { value: 'Risk Management and Insurance', label: 'Risk Management and Insurance' },
        { value: 'Aviation', label: 'Aviation' },
        { value: 'Fashion Merchandising', label: 'Fashion Merchandising' },
        { value: 'Higher Education Administration', label: 'Higher Education Administration' },
        { value: 'Fire Prevention', label: 'Fire Prevention' },
        { value: 'Commercial and Advertising Art', label: 'Commercial and Advertising Art' },
        { value: 'Medical Office Management', label: 'Medical Office Management' },
        { value: 'Corrections Officer', label: 'Corrections Officer' },
        { value: 'Dietetics', label: 'Dietetics' },
        { value: 'Organizational Behavior Studies', label: 'Organizational Behavior Studies' },
        { value: 'Medical Technology', label: 'Medical Technology' },
        { value: 'Construction Management', label: 'Construction Management' },
        { value: 'Behavioral Science', label: 'Behavioral Science' },
        { value: 'Forensic Psychology', label: 'Forensic Psychology' },
        { value: 'Parks and Recreation Management', label: 'Parks and Recreation Management' },
        { value: 'Biotechnology', label: 'Biotechnology' },
        { value: 'Forensic Science', label: 'Forensic Science' },
        { value: 'Materials Engineering', label: 'Materials Engineering' },
        { value: 'Optometry', label: 'Optometry' },
        { value: 'Art History', label: 'Art History' },
        { value: 'Systems Engineering', label: 'Systems Engineering' },
        { value: 'Agriculture', label: 'Agriculture' },
        { value: 'Religious Studies', label: 'Religious Studies' },
        { value: 'Sales Manager', label: 'Sales Manager' },
        { value: 'Project Management', label: 'Project Management' },
        { value: 'Fashion Design', label: 'Fashion Design' },
        { value: 'Nutrition', label: 'Nutrition' },
        { value: 'Marriage and Family Therapy', label: 'Marriage and Family Therapy' },
        { value: 'Veterinary Medicine', label: 'Veterinary Medicine' },
        { value: 'Financial Planning', label: 'Financial Planning' },
        { value: 'Middle School Teacher', label: 'Middle School Teacher' },
        { value: 'School Psychology', label: 'School Psychology' },
        { value: 'Christian Counseling', label: 'Christian Counseling' },
    ]

    const educationLevel = [
        { value: 'N/A', label: 'N/A' },
        { value: 'Postsecondary', label: 'Postsecondary' },
        { value: 'Bachelor\'s degree', label: 'Bachelor\'s degree' },
        { value: 'Master\'s degree', label: 'Master\'s degree' },
        { value: 'Doctorate degree', label: 'Doctorate degree' },
    ]

    const graduationYear = [
        { value: 'N/A', label: 'N/A' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
        { value: '2027', label: '2027' },
        { value: '2028', label: '2028' },
        { value: '2029', label: '2029' },
        { value: '2030', label: '2030' },
        { value: '2031', label: '2031' },
        { value: '2032', label: '2032' },
        { value: '2033', label: '2033' },
        { value: '2034', label: '2034' },
    ]



    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center">
            <nav className="navbar fixed-top bg-white navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="align-middle" src={LOGO} alt=""/>
                    </a>
                </div>
            </nav>

            <form onSubmit={handleSubmit(saveData)}>
                {isSuccess && !isLoading && (
                <div className="container h-100">
                    <div className="row">
                        <div className="col">
                            <div className="progress" role="progressbar" >
                                <div className="progress-bar" style={{width: "42%", backgroundColor: "#7DC478"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5 mt-5">
                        <div className="col">
                            <h1 className="tw-font-oceanwide">About your education</h1>
                        </div>
                        <div className="col">
                            <button type="submit" className="float-end ms-2 tw-font-bold tw-text-white tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-[#5685C9] tw-bg-[#5685C9] rounded tw-border-solid hover:tw-bg-white tw-duration-300">
                                {loading && (<Oval className="tw-duration-300" visible={true} color="#ffffff" secondaryColor='#ffffff' width="24" height="24" strokeWidth={4} strokeWidthSecondary={4} />)}
                                {!loading && ("Next")}
                            </button>
                            <button onClick={() => {navigate('/personalInfo2', {replace: true})}} className="float-end tw-font-bold tw-text-[#5685C9] tw-font-dmsans tw-border-[#5685C9] tw-border-2 tw-py-3 tw-px-5 tw-font hover:tw-text-white tw-bg-white rounded tw-border-solid hover:tw-bg-[#5685C9] tw-duration-300">{"<"}</button>
                        </div>
                    
                        <p className="tw-font-dmsans tm-text-[#5C667B] mt-2">Help us connect you with the right community of students!</p>
                    </div>
                    <div className="row gx-5 gy-5 align-items-center mt-2">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="menteeUniversity" className="form-label tw-font-dmsans">I study at
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer required",
                                            }}
                                            name="menteeUniversity"
                                            defaultValue={educationalInstitution.find(op => {
                                                return op.value === userProfile[0].schoolName
                                            })}
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#9EC5FE',
                                                        neutral10: '#E9ECEF',
                                                    }
                                                    })} 
                                                    styles={customStyles} 
                                                    options={educationalInstitution}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            )}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeUniversity"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="menteeProgram" className="form-label tw-font-dmsans">My program of study is
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer required",
                                            }}
                                            name="menteeProgram"
                                            defaultValue={program.find(op => {
                                                return op.value === userProfile[0].programOfStudy
                                            })}
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#9EC5FE',
                                                        neutral10: '#E9ECEF',
                                                    }
                                                    })} 
                                                    styles={customStyles} 
                                                    options={program}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            )}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeProgram"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="menteeEducationalLevel" className="form-label tw-font-dmsans">My education level is (currently enrolled/highest completed)
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer required",
                                            }}
                                            name="menteeEducationalLevel"
                                            defaultValue={educationLevel.find(op => {
                                                return op.value === userProfile[0].educationLevel
                                            })}
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#9EC5FE',
                                                        neutral10: '#E9ECEF',
                                                    }
                                                    })} 
                                                    styles={customStyles} 
                                                    options={educationLevel}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            )}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeEducationalLevel"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <hr className="hr" /> 
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label htmlFor="menteeGraduationYear" className="form-label tw-font-dmsans">My expected graduation year is
                                        <p className="tw-font-dmans tw-text-[#DE5840] tw-inline-block tw--mb-4">*</p>
                                    </label>
                                    <div className="tw-font-dmsans">
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: "Answer required",
                                            }}
                                            name="menteeGraduationYear"
                                            defaultValue={graduationYear.find(op => {
                                                return op.value === userProfile[0].graduationYear
                                            })}
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <Select theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#9EC5FE',
                                                        neutral10: '#E9ECEF',
                                                    }
                                                    })} 
                                                    styles={customStyles} 
                                                    options={graduationYear}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    name={name}
                                                    ref={ref}
                                                />
                                            )}
                                        />

                                        <ErrorMessage 
                                            errors={errors}
                                            name="menteeGraduationYear"
                                            render={({ message }) => <p className="tw--mb-4 tw-font-dmsans tw-text-[#DE5840]"><small>{message}</small></p>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col offset-md-1 d-flex align-items-center justify-content-center">
                            <img className="img-fluid" src={IMG} alt=""></img>
                        </div>
                    </div>
                </div>
                )}
            </form>
        </div>
    )
}

export default Education
