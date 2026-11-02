document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'avg_gpa_app_state_v2';

    // DOM Elements
    const coursesContainer = document.getElementById('courses-container');
    const addCourseBtn = document.getElementById('add-course-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const gpaResultEl = document.getElementById('gpa-result');
    const classificationResultEl = document.getElementById('classification-result');
    const semesterCreditsResultEl = document.getElementById('semester-credits-result');
    const semesterGrade10ResultEl = document.getElementById('semester-grade10-result');
    const semesterResultLabelEl = document.getElementById('semester-result-label');

    const cpaResultEl = document.getElementById('cpa-result');
    const cpaClassificationResultEl = document.getElementById('cpa-classification-result');
    const totalCreditsResultEl = document.getElementById('total-credits-result');
    const cpaGrade10ResultEl = document.getElementById('cpa-grade10-result');

    const resultContainer = document.getElementById('result-container');
    const errorMessageEl = document.getElementById('error-message');

    const regularWeightInput = document.getElementById('regular-weight');
    const midtermWeightInput = document.getElementById('midterm-weight');
    const finalWeightInput = document.getElementById('final-weight');
    const midtermWeightContainer = document.getElementById('midterm-weight-container');
    const weightsConfigPanel = document.getElementById('weights-config-panel');

    const roundGrade10Checkbox = document.getElementById('round-grade10-checkbox');
    const enableMidtermCheckbox = document.getElementById('enable-midterm-checkbox');
    const enableMidtermWrapper = document.getElementById('enable-midterm-wrapper');
    const inputModeSelector = document.getElementById('input-mode-selector');

    const semesterTabsContainer = document.getElementById('semester-tabs-container');
    const addSemesterBtn = document.getElementById('add-semester-btn');
    const renameSemesterBtn = document.getElementById('rename-semester-btn');
    const deleteSemesterBtn = document.getElementById('delete-semester-btn');
    const currentSemesterTitleEl = document.getElementById('current-semester-title');
    const resetDataBtn = document.getElementById('reset-data-btn');
    const autosaveStatusEl = document.getElementById('autosave-status');

    const importExcelBtn = document.getElementById('import-excel-btn');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const excelFileInput = document.getElementById('excel-file-input');
    const downloadSampleBtn = document.getElementById('download-sample-btn');

    const universitySelect = document.getElementById('university-select');
    const universitySearch = document.getElementById('university-search');
    const selectedUniversityBadge = document.getElementById('selected-university-badge');
    const conversionTableBody = document.getElementById('conversion-table-body');
    const conversionWrapper = document.getElementById('conversion-wrapper');
    const loadingSpinner = document.getElementById('loading-spinner');

    const geminiFeedbackSection = document.getElementById('gemini-feedback-section');
    const getFeedbackBtn = document.getElementById('get-feedback-btn');
    const feedbackLoading = document.getElementById('feedback-loading');
    const feedbackResult = document.getElementById('feedback-result');

    const adContainer = document.getElementById('ad-container');
    let adInitialized = false;

    // Goal Calculator Elements
    const goalCurrentCreditsInput = document.getElementById('goal-current-credits');
    const goalCurrentCpaInput = document.getElementById('goal-current-cpa');
    const goalRemainingCreditsInput = document.getElementById('goal-remaining-credits');
    const goalTargetCpaInput = document.getElementById('goal-target-cpa');
    const syncGoalFromCpaBtn = document.getElementById('sync-goal-from-cpa-btn');
    const calculateGoalBtn = document.getElementById('calculate-goal-btn');
    const goalResultBox = document.getElementById('goal-result-box');

    // Danh sách các trường Đại học
    const universities = [
        { id: 'AJC', name: 'Học viện Báo chí và Tuyên truyền (AJC)' },
        { id: 'PTIT', name: 'Học viện Bưu chính Viễn thông (PTIT)' },
        { id: 'BA', name: 'Học viện Ngân hàng (BA)' },
        { id: 'DAV', name: 'Học viện Ngoại giao (DAV)' },
        { id: 'AOF', name: 'Học viện Tài chính (AOF)' },
        { id: 'HUST', name: 'Đại học Bách khoa Hà Nội (HUST)' },
        { id: 'HaUI', name: 'Đại học Công nghiệp Hà Nội (HaUI)' },
        { id: 'UTT', name: 'Đại học Công nghệ GTVT (UTT)' },
        { id: 'EPU', name: 'Đại học Điện Lực (EPU)' },
        { id: 'HUP', name: 'Đại học Dược Hà Nội (HUP)' },
        { id: 'UTC', name: 'Đại học Giao thông Vận tải (UTC)' },
        { id: 'HANU', name: 'Đại học Hà Nội (HANU)' },
        { id: 'HAU', name: 'Đại học Kiến trúc Hà Nội (HAU)' },
        { id: 'NEU', name: 'Đại học Kinh tế Quốc dân (NEU)' },
        { id: 'ULSA', name: 'Đại học Lao động - Xã hội (ULSA)' },
        { id: 'HLU', name: 'Đại học Luật Hà Nội (HLU)' },
        { id: 'HOU', name: 'Đại học Mở Hà Nội (HOU)' },
        { id: 'HUMG', name: 'Đại học Mỏ - Địa chất (HUMG)' },
        { id: 'FTU', name: 'Đại học Ngoại thương (FTU)' },
        { id: 'Phenikaa', name: 'Đại học Phenikaa' },
        { id: 'VNU', name: 'Đại học Quốc gia Hà Nội (VNU)' },
        { id: 'HNUE', name: 'Đại học Sư phạm Hà Nội (HNUE)' },
        { id: 'ThangLong', name: 'Đại học Thăng Long' },
        { id: 'TLU', name: 'Đại học Thủy lợi (TLU)' },
        { id: 'TMU', name: 'Đại học Thương mại (TMU)' },
        { id: 'HUC', name: 'Đại học Văn hóa Hà Nội (HUC)' },
        { id: 'HUCE', name: 'Đại học Xây dựng Hà Nội (HUCE)' },
        { id: 'HMU', name: 'Đại học Y Hà Nội (HMU)' },
        { id: 'RMIT', name: 'Đại học RMIT Việt Nam' },
        { id: 'FPTU', name: 'Đại học FPT' },
    ];

    const standardScale = [
        { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5, rep10: 9.0 },
        { range: '8.0 - 8.4', letter: 'B+', gpa: 3.5, min: 8.0, rep10: 8.2 },
        { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0, rep10: 7.5 },
        { range: '6.5 - 6.9', letter: 'C+', gpa: 2.5, min: 6.5, rep10: 6.7 },
        { range: '5.5 - 6.4', letter: 'C', gpa: 2.0, min: 5.5, rep10: 6.0 },
        { range: '5.0 - 5.4', letter: 'D+', gpa: 1.5, min: 5.0, rep10: 5.2 },
        { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0, rep10: 4.5 },
        { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0, rep10: 2.0 },
    ];

    const gradingScales = {
        EPU: standardScale, PTIT: standardScale, AOF: standardScale, TMU: standardScale,
        HANU: standardScale, BA: standardScale, HUCE: standardScale, UTC: standardScale,
        TLU: standardScale, HOU: standardScale, AJC: standardScale, HaUI: standardScale,
        UTT: standardScale, HUP: standardScale, HAU: standardScale, ULSA: standardScale,
        HLU: standardScale, HUMG: standardScale, HNUE: standardScale, ThangLong: standardScale,
        HUC: standardScale, HMU: standardScale, DAV: standardScale, Phenikaa: standardScale, FPTU: standardScale,
        HUST: [
            { range: '9.5 - 10', letter: 'A+', gpa: 4.0, min: 9.5, rep10: 9.7 },
            { range: '8.5 - 9.4', letter: 'A', gpa: 4.0, min: 8.5, rep10: 9.0 },
            { range: '8.0 - 8.4', letter: 'B+', gpa: 3.5, min: 8.0, rep10: 8.2 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0, rep10: 7.5 },
            { range: '6.5 - 6.9', letter: 'C+', gpa: 2.5, min: 6.5, rep10: 6.7 },
            { range: '5.5 - 6.4', letter: 'C', gpa: 2.0, min: 5.5, rep10: 6.0 },
            { range: '5.0 - 5.4', letter: 'D+', gpa: 1.5, min: 5.0, rep10: 5.2 },
            { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0, rep10: 4.5 },
            { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0, rep10: 2.0 },
        ],
        NEU: [
            { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5, rep10: 9.0 },
            { range: '8.0 - 8.4', letter: 'B+', gpa: 3.7, min: 8.0, rep10: 8.2 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0, rep10: 7.5 },
            { range: '6.0 - 6.9', letter: 'C+', gpa: 2.5, min: 6.0, rep10: 6.5 },
            { range: '5.5 - 5.9', letter: 'C', gpa: 2.0, min: 5.5, rep10: 5.7 },
            { range: '5.0 - 5.4', letter: 'D+', gpa: 1.5, min: 5.0, rep10: 5.2 },
            { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0, rep10: 4.5 },
            { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0, rep10: 2.0 },
        ],
        VNU: [
            { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5, rep10: 9.0 },
            { range: '8.0 - 8.4', letter: 'B+', gpa: 3.7, min: 8.0, rep10: 8.2 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0, rep10: 7.5 },
            { range: '6.5 - 6.9', letter: 'C+', gpa: 2.7, min: 6.5, rep10: 6.7 },
            { range: '5.5 - 6.4', letter: 'C', gpa: 2.0, min: 5.5, rep10: 6.0 },
            { range: '5.0 - 5.4', letter: 'D+', gpa: 1.7, min: 5.0, rep10: 5.2 },
            { range: '4.0 - 4.9', letter: 'D', gpa: 1.0, min: 4.0, rep10: 4.5 },
            { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0, rep10: 2.0 },
        ],
        FTU: [
            { range: '8.5 - 10', letter: 'A', gpa: 4.0, min: 8.5, rep10: 9.0 },
            { range: '8.0 - 8.4', letter: 'B+', gpa: 3.5, min: 8.0, rep10: 8.2 },
            { range: '7.0 - 7.9', letter: 'B', gpa: 3.0, min: 7.0, rep10: 7.5 },
            { range: '6.0 - 6.9', letter: 'C+', gpa: 2.5, min: 6.0, rep10: 6.5 },
            { range: '5.0 - 5.9', letter: 'C', gpa: 2.0, min: 5.0, rep10: 5.5 },
            { range: '4.5 - 4.9', letter: 'D+', gpa: 1.5, min: 4.5, rep10: 4.7 },
            { range: '4.0 - 4.4', letter: 'D', gpa: 1.0, min: 4.0, rep10: 4.2 },
            { range: 'Dưới 4.0', letter: 'F', gpa: 0.0, min: 0.0, rep10: 2.0 },
        ],
        RMIT: [
            { range: '8.0 - 10', letter: 'HD', gpa: 4.0, min: 8.0, rep10: 9.0 },
            { range: '7.0 - 7.9', letter: 'DI', gpa: 3.0, min: 7.0, rep10: 7.5 },
            { range: '6.0 - 6.9', letter: 'CR', gpa: 2.0, min: 6.0, rep10: 6.5 },
            { range: '5.0 - 5.9', letter: 'PA', gpa: 1.0, min: 5.0, rep10: 5.5 },
            { range: 'Dưới 5.0', letter: 'NN', gpa: 0.0, min: 0.0, rep10: 2.5 },
        ],
    };

    // Trạng thái ứng dụng (App State)
    const createDefaultCourse = () => ({
        name: '',
        credits: '',
        regularAvg: '',
        midtermAvg: '',
        finalExam: '',
        directGrade10: '',
        letterGrade: 'A',
        useCustomWeights: false,
        customRegularWeight: '',
        customMidtermWeight: '',
        customFinalWeight: '',
    });

    let appState = {
        selectedSchoolId: 'EPU',
        inputMode: 'component', // 'component' | 'direct10' | 'letter'
        roundGrade10: true,
        enableMidterm: false,
        regularWeight: 30,
        midtermWeight: 0,
        finalWeight: 70,
        activeSemesterId: 'sem-1',
        semesters: [
            {
                id: 'sem-1',
                name: 'Học kỳ 1',
                courses: [createDefaultCourse()],
            },
        ],
    };

    // --- Tiện ích Toán học & Quy đổi ---
    const roundToOneDecimal = (num) => {
        return Math.round((num + Number.EPSILON) * 10) / 10;
    };

    const normalizeFloat = (num) => {
        return Math.round((num + Number.EPSILON) * 10000) / 10000;
    };

    const getScaleForSchool = (schoolId) => {
        return gradingScales[schoolId] || standardScale;
    };

    const convertGrade10ToScaleItem = (rawGrade10, schoolId) => {
        const scale = getScaleForSchool(schoolId);
        const effectiveGrade10 = appState.roundGrade10
            ? roundToOneDecimal(rawGrade10)
            : normalizeFloat(rawGrade10);

        for (const item of scale) {
            if (effectiveGrade10 >= item.min) {
                return {
                    ...item,
                    effectiveGrade10,
                };
            }
        }
        return {
            ...(scale[scale.length - 1] || { letter: 'F', gpa: 0.0 }),
            effectiveGrade10,
        };
    };

    const convertLetterToScaleItem = (letter, schoolId) => {
        const scale = getScaleForSchool(schoolId);
        const found = scale.find((item) => item.letter === letter);
        if (found) {
            return { ...found, effectiveGrade10: found.rep10 };
        }
        return { ...scale[0], effectiveGrade10: scale[0].rep10 };
    };

    const getClassification = (gpa) => {
        const roundedGpa = Math.round((gpa + Number.EPSILON) * 100) / 100;
        if (roundedGpa >= 3.6) return 'Xuất sắc';
        if (roundedGpa >= 3.2) return 'Giỏi';
        if (roundedGpa >= 2.5) return 'Khá';
        if (roundedGpa >= 2.0) return 'Trung bình';
        return 'Yếu';
    };

    const getBadgeColorClasses = (gpa) => {
        if (gpa >= 3.6) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        if (gpa >= 3.0) return 'bg-blue-100 text-blue-800 border-blue-300';
        if (gpa >= 2.0) return 'bg-amber-100 text-amber-800 border-amber-300';
        if (gpa >= 1.0) return 'bg-orange-100 text-orange-800 border-orange-300';
        return 'bg-red-100 text-red-800 border-red-300';
    };

    const isNumericInputValid = (val, min, max) => {
        if (val === '' || val === null || val === undefined) return false;
        const num = Number(val);
        return !Number.isNaN(num) && num >= min && num <= max;
    };

    // Tính toán kết quả cho 1 môn học từ object courseData
    const evaluateCourse = (course, schoolId) => {
        const credits = parseFloat(course.credits);
        const hasValidCredits = !Number.isNaN(credits) && credits > 0;

        const mode = appState.inputMode;
        let rawGrade10 = null;
        let isScoreValid = false;
        let scaleItem = null;

        if (mode === 'component') {
            const regW = course.useCustomWeights && course.customRegularWeight !== ''
                ? parseFloat(course.customRegularWeight)
                : parseFloat(appState.regularWeight) || 0;
            const midW = appState.enableMidterm
                ? (course.useCustomWeights && course.customMidtermWeight !== ''
                    ? parseFloat(course.customMidtermWeight)
                    : parseFloat(appState.midtermWeight) || 0)
                : 0;
            const finW = course.useCustomWeights && course.customFinalWeight !== ''
                ? parseFloat(course.customFinalWeight)
                : parseFloat(appState.finalWeight) || 0;

            const weightsSum = Math.round((regW + midW + finW) * 100) / 100;
            const validReg = isNumericInputValid(course.regularAvg, 0, 10);
            const validMid = !appState.enableMidterm || isNumericInputValid(course.midtermAvg, 0, 10);
            const validFin = isNumericInputValid(course.finalExam, 0, 10);

            if (weightsSum === 100 && validReg && validMid && validFin) {
                const reg = parseFloat(course.regularAvg);
                const mid = appState.enableMidterm ? parseFloat(course.midtermAvg) : 0;
                const fin = parseFloat(course.finalExam);
                rawGrade10 = normalizeFloat((reg * regW + mid * midW + fin * finW) / 100);
                scaleItem = convertGrade10ToScaleItem(rawGrade10, schoolId);
                isScoreValid = true;
            }
        } else if (mode === 'direct10') {
            if (isNumericInputValid(course.directGrade10, 0, 10)) {
                rawGrade10 = parseFloat(course.directGrade10);
                scaleItem = convertGrade10ToScaleItem(rawGrade10, schoolId);
                isScoreValid = true;
            }
        } else if (mode === 'letter') {
            if (course.letterGrade) {
                scaleItem = convertLetterToScaleItem(course.letterGrade, schoolId);
                rawGrade10 = scaleItem.effectiveGrade10;
                isScoreValid = true;
            }
        }

        return {
            hasValidCredits,
            isScoreValid,
            isValid: hasValidCredits && isScoreValid,
            credits: hasValidCredits ? credits : 0,
            rawGrade10,
            effectiveGrade10: scaleItem ? scaleItem.effectiveGrade10 : null,
            letter: scaleItem ? scaleItem.letter : '-',
            gpa4: scaleItem ? scaleItem.gpa : null,
        };
    };

    // --- Lưu & Khôi phục LocalStorage ---
    const saveStateToStorage = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
            if (autosaveStatusEl) {
                autosaveStatusEl.textContent = '✓ Đã tự động lưu thay đổi';
            }
        } catch (err) {
            console.warn('Không thể lưu vào localStorage:', err);
        }
    };

    const loadStateFromStorage = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                appState = {
                    ...appState,
                    ...parsed,
                    selectedSchoolId: gradingScales[parsed.selectedSchoolId] ? parsed.selectedSchoolId : 'EPU',
                    semesters: Array.isArray(parsed.semesters) && parsed.semesters.length > 0
                        ? parsed.semesters
                        : appState.semesters,
                };
                if (!appState.semesters.some((s) => s.id === appState.activeSemesterId)) {
                    appState.activeSemesterId = appState.semesters[0].id;
                }
            }
        } catch (err) {
            console.warn('Không thể đọc localStorage:', err);
        }
    };

    const getActiveSemester = () => {
        return appState.semesters.find((s) => s.id === appState.activeSemesterId) || appState.semesters[0];
    };

    // Đồng bộ dữ liệu từ DOM của học kỳ hiện tại vào appState
    const syncActiveSemesterFromDOM = () => {
        const activeSem = getActiveSemester();
        if (!activeSem) return;

        const rows = coursesContainer.querySelectorAll('.course-row');
        const updatedCourses = [];

        rows.forEach((row) => {
            updatedCourses.push({
                name: row.querySelector('.course-name')?.value || '',
                credits: row.querySelector('.credits')?.value ?? '',
                regularAvg: row.querySelector('.regular-avg')?.value ?? '',
                midtermAvg: row.querySelector('.midterm-avg')?.value ?? '',
                finalExam: row.querySelector('.final-exam')?.value ?? '',
                directGrade10: row.querySelector('.direct-grade10')?.value ?? '',
                letterGrade: row.querySelector('.letter-grade')?.value || 'A',
                useCustomWeights: row.dataset.useCustomWeights === 'true',
                customRegularWeight: row.querySelector('.custom-regular-weight')?.value ?? '',
                customMidtermWeight: row.querySelector('.custom-midterm-weight')?.value ?? '',
                customFinalWeight: row.querySelector('.custom-final-weight')?.value ?? '',
            });
        });

        activeSem.courses = updatedCourses.length > 0 ? updatedCourses : [createDefaultCourse()];
        saveStateToStorage();
    };

    // --- Hiển thị thông báo lỗi ---
    let errorTimeout = null;
    const showError = (message) => {
        errorMessageEl.textContent = message;
        errorMessageEl.classList.remove('hidden');
        if (errorTimeout) clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            errorMessageEl.classList.add('hidden');
        }, 5000);
    };

    // --- Quản lý danh sách Trường Đại học & Bảng quy đổi ---
    const updateSelectedSchoolBadge = () => {
        const uni = universities.find((u) => u.id === appState.selectedSchoolId);
        if (selectedUniversityBadge && uni) {
            selectedUniversityBadge.textContent = `🏫 ${uni.name}`;
        }
    };

    const populateUniversityList = (filter = '') => {
        universitySelect.innerHTML = '';
        const lowerCaseFilter = filter.trim().toLowerCase();
        const filteredUniversities = universities.filter((uni) =>
            uni.name.toLowerCase().includes(lowerCaseFilter) || uni.id.toLowerCase().includes(lowerCaseFilter)
        );

        if (filteredUniversities.length === 0) {
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.disabled = true;
            emptyOption.textContent = 'Không tìm thấy trường phù hợp...';
            universitySelect.appendChild(emptyOption);
            return;
        }

        const isCurrentInFiltered = filteredUniversities.some((u) => u.id === appState.selectedSchoolId);
        const targetIdToSelect = isCurrentInFiltered ? appState.selectedSchoolId : filteredUniversities[0].id;

        filteredUniversities.forEach((uni) => {
            const option = document.createElement('option');
            option.value = uni.id;
            option.textContent = uni.name;
            if (uni.id === targetIdToSelect) {
                option.selected = true;
            }
            universitySelect.appendChild(option);
        });

        if (targetIdToSelect !== appState.selectedSchoolId) {
            appState.selectedSchoolId = targetIdToSelect;
            updateSelectedSchoolBadge();
            updateConversionTable(appState.selectedSchoolId);
            refreshAllCourseRowBadges();
            saveStateToStorage();
        }
    };

    const formatScaleGpa = (gpa) => {
        return Number.isInteger(gpa * 10) ? gpa.toFixed(1) : gpa.toFixed(2);
    };

    const updateConversionTable = (schoolId) => {
        if (!schoolId || !gradingScales[schoolId]) return;
        const scale = gradingScales[schoolId];
        conversionTableBody.innerHTML = '';
        scale.forEach((item) => {
            const row = document.createElement('tr');
            row.className = 'border-b last:border-b-0 hover:bg-gray-50';
            row.innerHTML = `
                <td class="p-2">${item.range}</td>
                <td class="p-2 font-semibold text-blue-700">${item.letter}</td>
                <td class="p-2 font-medium">${formatScaleGpa(item.gpa)}</td>
            `;
            conversionTableBody.appendChild(row);
        });
    };

    const showConversionTable = (schoolId, immediate = false) => {
        if (!schoolId) return;
        conversionWrapper.classList.remove('hidden');
        const tableEl = conversionTableBody.closest('table');

        if (immediate) {
            loadingSpinner.classList.add('hidden');
            tableEl.classList.remove('hidden');
            updateConversionTable(schoolId);
            return;
        }

        loadingSpinner.classList.remove('hidden');
        tableEl.classList.add('hidden');

        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            tableEl.classList.remove('hidden');
            updateConversionTable(schoolId);
        }, 200);
    };

    // --- Render các Tab Học kỳ ---
    const renderSemesterTabs = () => {
        semesterTabsContainer.innerHTML = '';
        appState.semesters.forEach((sem) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const isActive = sem.id === appState.activeSemesterId;
            btn.className = `semester-tab text-sm font-medium py-1.5 px-3.5 rounded-lg border transition ${
                isActive
                    ? 'active'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`;
            btn.textContent = sem.name;
            btn.addEventListener('click', () => {
                if (sem.id === appState.activeSemesterId) return;
                syncActiveSemesterFromDOM();
                appState.activeSemesterId = sem.id;
                saveStateToStorage();
                renderSemesterTabs();
                renderActiveSemesterCourses();
            });
            semesterTabsContainer.appendChild(btn);
        });

        const activeSem = getActiveSemester();
        if (currentSemesterTitleEl && activeSem) {
            currentSemesterTitleEl.textContent = `Danh sách môn học - ${activeSem.name}`;
        }
        if (deleteSemesterBtn) {
            deleteSemesterBtn.classList.toggle('hidden', appState.semesters.length <= 1);
        }
    };

    // --- Render dòng môn học ---
    const updateCourseRowBadge = (row) => {
        const badgeEl = row.querySelector('.course-preview-badge');
        if (!badgeEl) return;

        const courseObj = {
            credits: row.querySelector('.credits')?.value ?? '',
            regularAvg: row.querySelector('.regular-avg')?.value ?? '',
            midtermAvg: row.querySelector('.midterm-avg')?.value ?? '',
            finalExam: row.querySelector('.final-exam')?.value ?? '',
            directGrade10: row.querySelector('.direct-grade10')?.value ?? '',
            letterGrade: row.querySelector('.letter-grade')?.value || 'A',
            useCustomWeights: row.dataset.useCustomWeights === 'true',
            customRegularWeight: row.querySelector('.custom-regular-weight')?.value ?? '',
            customMidtermWeight: row.querySelector('.custom-midterm-weight')?.value ?? '',
            customFinalWeight: row.querySelector('.custom-final-weight')?.value ?? '',
        };

        const evalRes = evaluateCourse(courseObj, appState.selectedSchoolId);
        if (!evalRes.isScoreValid) {
            badgeEl.className = 'course-preview-badge text-xs px-2.5 py-1 rounded-md border bg-gray-100 text-gray-500 border-gray-200 whitespace-nowrap';
            badgeEl.textContent = 'Chưa đủ điểm';
            return;
        }

        const colorClass = getBadgeColorClasses(evalRes.gpa4);
        badgeEl.className = `course-preview-badge text-xs font-semibold px-2.5 py-1 rounded-md border whitespace-nowrap ${colorClass}`;
        if (appState.inputMode === 'letter') {
            badgeEl.textContent = `${evalRes.letter} • Hệ 4: ${formatScaleGpa(evalRes.gpa4)}`;
        } else {
            badgeEl.textContent = `TK10: ${evalRes.effectiveGrade10.toFixed(1)} → ${evalRes.letter} (${formatScaleGpa(evalRes.gpa4)})`;
        }
    };

    const refreshAllCourseRowBadges = () => {
        const scale = getScaleForSchool(appState.selectedSchoolId);
        coursesContainer.querySelectorAll('.course-row').forEach((row) => {
            const letterSelect = row.querySelector('.letter-grade');
            if (letterSelect) {
                const prevVal = letterSelect.value;
                letterSelect.innerHTML = scale
                    .map((item) => `<option value="${item.letter}">${item.letter} (${formatScaleGpa(item.gpa)})</option>`)
                    .join('');
                if (scale.some((item) => item.letter === prevVal)) {
                    letterSelect.value = prevVal;
                }
            }
            updateCourseRowBadge(row);
        });
    };

    const createCourseRow = (courseData = createDefaultCourse()) => {
        const row = document.createElement('div');
        row.className = 'course-row bg-gray-50/70 border border-gray-200 p-3 rounded-xl fade-in space-y-2';
        row.dataset.useCustomWeights = courseData.useCustomWeights ? 'true' : 'false';

        const scale = getScaleForSchool(appState.selectedSchoolId);
        const letterOptionsHtml = scale
            .map(
                (item) =>
                    `<option value="${item.letter}" ${
                        item.letter === (courseData.letterGrade || 'A') ? 'selected' : ''
                    }>${item.letter} (${formatScaleGpa(item.gpa)})</option>`
            )
            .join('');

        const isComponentMode = appState.inputMode === 'component';
        const isDirect10Mode = appState.inputMode === 'direct10';
        const isLetterMode = appState.inputMode === 'letter';

        row.innerHTML = `
            <div class="grid grid-cols-12 gap-2 items-center">
                <div class="col-span-12 sm:col-span-4">
                    <input type="text" placeholder="Tên môn học (không bắt buộc)"
                        class="course-name w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>
                <div class="col-span-4 sm:col-span-2">
                    <input type="number" min="0.5" step="0.5" placeholder="Số TC"
                        class="credits w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required>
                </div>

                <!-- Chế độ 1: Điểm thành phần -->
                <div class="component-inputs col-span-8 sm:col-span-4 grid ${appState.enableMidterm ? 'grid-cols-3' : 'grid-cols-2'} gap-2 ${isComponentMode ? '' : 'hidden'}">
                    <input type="number" min="0" max="10" step="0.1" placeholder="${appState.enableMidterm ? 'CC/TK1' : 'TB TK'}"
                        class="regular-avg w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <input type="number" min="0" max="10" step="0.1" placeholder="Giữa kỳ"
                        class="midterm-avg w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${appState.enableMidterm ? '' : 'hidden'}">
                    <input type="number" min="0" max="10" step="0.1" placeholder="Điểm CK"
                        class="final-exam w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>

                <!-- Chế độ 2: Điểm tổng kết hệ 10 -->
                <div class="direct10-inputs col-span-8 sm:col-span-4 ${isDirect10Mode ? '' : 'hidden'}">
                    <input type="number" min="0" max="10" step="0.1" placeholder="Điểm tổng kết hệ 10 (0 - 10)"
                        class="direct-grade10 w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>

                <!-- Chế độ 3: Điểm chữ -->
                <div class="letter-inputs col-span-8 sm:col-span-4 ${isLetterMode ? '' : 'hidden'}">
                    <select class="letter-grade w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        ${letterOptionsHtml}
                    </select>
                </div>

                <!-- Nút chức năng -->
                <div class="col-span-12 sm:col-span-2 flex items-center justify-end gap-1.5">
                    <button type="button" title="Tùy chỉnh tỷ lệ % điểm riêng cho môn này"
                        class="toggle-custom-weight-btn p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-200 transition ${isComponentMode ? '' : 'hidden'}">
                        ⚙️
                    </button>
                    <button type="button"
                        class="remove-course-btn bg-red-500 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-red-600 transition shadow-sm">
                        Xóa
                    </button>
                </div>
            </div>

            <!-- Dòng phụ: Hiển thị quy đổi trực tiếp & Tỷ lệ riêng (nếu bật) -->
            <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div class="flex items-center gap-2">
                    <span class="course-preview-badge text-xs px-2.5 py-1 rounded-md border bg-gray-100 text-gray-500 border-gray-200">
                        Chưa đủ điểm
                    </span>
                </div>

                <div class="custom-weights-row flex flex-wrap items-center gap-2 text-xs ${courseData.useCustomWeights && isComponentMode ? '' : 'hidden'}">
                    <span class="text-blue-700 font-medium">Tỷ lệ riêng (%):</span>
                    <input type="number" min="0" max="100" placeholder="TK %"
                        class="custom-regular-weight w-16 p-1 text-center bg-white border border-blue-300 rounded">
                    <input type="number" min="0" max="100" placeholder="GK %"
                        class="custom-midterm-weight w-16 p-1 text-center bg-white border border-blue-300 rounded ${appState.enableMidterm ? '' : 'hidden'}">
                    <input type="number" min="0" max="100" placeholder="CK %"
                        class="custom-final-weight w-16 p-1 text-center bg-white border border-blue-300 rounded">
                </div>
            </div>
        `;

        // Gán giá trị an toàn (kể cả số 0)
        row.querySelector('.course-name').value = courseData.name ?? '';
        row.querySelector('.credits').value = courseData.credits ?? '';
        row.querySelector('.regular-avg').value = courseData.regularAvg ?? '';
        row.querySelector('.midterm-avg').value = courseData.midtermAvg ?? '';
        row.querySelector('.final-exam').value = courseData.finalExam ?? '';
        row.querySelector('.direct-grade10').value = courseData.directGrade10 ?? '';
        if (courseData.letterGrade && scale.some((s) => s.letter === courseData.letterGrade)) {
            row.querySelector('.letter-grade').value = courseData.letterGrade;
        }
        row.querySelector('.custom-regular-weight').value = courseData.customRegularWeight ?? '';
        row.querySelector('.custom-midterm-weight').value = courseData.customMidtermWeight ?? '';
        row.querySelector('.custom-final-weight').value = courseData.customFinalWeight ?? '';

        coursesContainer.appendChild(row);
        updateCourseRowBadge(row);
    };

    const renderActiveSemesterCourses = () => {
        coursesContainer.innerHTML = '';
        const activeSem = getActiveSemester();
        const courses = activeSem && Array.isArray(activeSem.courses) && activeSem.courses.length > 0
            ? activeSem.courses
            : [createDefaultCourse()];

        courses.forEach((course) => createCourseRow(course));
    };

    // Cập nhật giao diện theo chế độ nhập điểm và tùy chọn 3 đầu điểm
    const updateInputModeUI = () => {
        const mode = appState.inputMode;
        const isComponent = mode === 'component';

        inputModeSelector.querySelectorAll('.mode-btn').forEach((btn) => {
            const active = btn.dataset.mode === mode;
            btn.classList.toggle('active', active);
            btn.classList.toggle('text-gray-600', !active);
        });

        weightsConfigPanel.classList.toggle('hidden', !isComponent);
        enableMidtermWrapper.classList.toggle('hidden', !isComponent);
        midtermWeightContainer.classList.toggle('hidden', !appState.enableMidterm);

        coursesContainer.querySelectorAll('.course-row').forEach((row) => {
            const compDiv = row.querySelector('.component-inputs');
            const dir10Div = row.querySelector('.direct10-inputs');
            const letterDiv = row.querySelector('.letter-inputs');
            const customWeightBtn = row.querySelector('.toggle-custom-weight-btn');
            const customWeightsRow = row.querySelector('.custom-weights-row');
            const midtermInput = row.querySelector('.midterm-avg');
            const regularInput = row.querySelector('.regular-avg');
            const customMidWeight = row.querySelector('.custom-midterm-weight');

            compDiv.classList.toggle('hidden', !isComponent);
            compDiv.classList.toggle('grid-cols-3', appState.enableMidterm);
            compDiv.classList.toggle('grid-cols-2', !appState.enableMidterm);

            dir10Div.classList.toggle('hidden', mode !== 'direct10');
            letterDiv.classList.toggle('hidden', mode !== 'letter');
            customWeightBtn.classList.toggle('hidden', !isComponent);

            if (midtermInput) midtermInput.classList.toggle('hidden', !appState.enableMidterm);
            if (regularInput) regularInput.placeholder = appState.enableMidterm ? 'CC/TK1' : 'TB TK';
            if (customMidWeight) customMidWeight.classList.toggle('hidden', !appState.enableMidterm);

            const useCustom = row.dataset.useCustomWeights === 'true';
            customWeightsRow.classList.toggle('hidden', !(useCustom && isComponent));

            updateCourseRowBadge(row);
        });
    };

    // --- Sự kiện Quản lý Học kỳ ---
    addSemesterBtn.addEventListener('click', () => {
        syncActiveSemesterFromDOM();
        const nextNum = appState.semesters.length + 1;
        const newId = `sem-${Date.now()}`;
        appState.semesters.push({
            id: newId,
            name: `Học kỳ ${nextNum}`,
            courses: [createDefaultCourse()],
        });
        appState.activeSemesterId = newId;
        saveStateToStorage();
        renderSemesterTabs();
        renderActiveSemesterCourses();
    });

    renameSemesterBtn.addEventListener('click', () => {
        const activeSem = getActiveSemester();
        if (!activeSem) return;
        const newName = window.prompt('Nhập tên mới cho học kỳ:', activeSem.name);
        if (newName && newName.trim()) {
            activeSem.name = newName.trim();
            saveStateToStorage();
            renderSemesterTabs();
        }
    });

    deleteSemesterBtn.addEventListener('click', () => {
        if (appState.semesters.length <= 1) {
            showError('Bạn cần giữ lại ít nhất một học kỳ.');
            return;
        }
        const activeSem = getActiveSemester();
        if (!window.confirm(`Bạn có chắc muốn xóa "${activeSem.name}" không?`)) return;

        appState.semesters = appState.semesters.filter((s) => s.id !== activeSem.id);
        appState.activeSemesterId = appState.semesters[0].id;
        saveStateToStorage();
        renderSemesterTabs();
        renderActiveSemesterCourses();
    });

    resetDataBtn.addEventListener('click', () => {
        if (!window.confirm('Xóa toàn bộ dữ liệu các môn học đã lưu và quay về mặc định?')) return;
        localStorage.removeItem(STORAGE_KEY);
        appState.semesters = [
            {
                id: 'sem-1',
                name: 'Học kỳ 1',
                courses: [createDefaultCourse()],
            },
        ];
        appState.activeSemesterId = 'sem-1';
        resultContainer.classList.add('hidden');
        geminiFeedbackSection.classList.add('hidden');
        renderSemesterTabs();
        renderActiveSemesterCourses();
        saveStateToStorage();
    });

    // --- Sự kiện Chế độ nhập & Trọng số ---
    inputModeSelector.addEventListener('click', (e) => {
        const btn = e.target.closest('.mode-btn');
        if (!btn) return;
        syncActiveSemesterFromDOM();
        appState.inputMode = btn.dataset.mode;
        updateInputModeUI();
        saveStateToStorage();
    });

    roundGrade10Checkbox.addEventListener('change', () => {
        appState.roundGrade10 = roundGrade10Checkbox.checked;
        refreshAllCourseRowBadges();
        saveStateToStorage();
        if (!resultContainer.classList.contains('hidden')) {
            calculateBtn.click();
        }
    });

    enableMidtermCheckbox.addEventListener('change', () => {
        appState.enableMidterm = enableMidtermCheckbox.checked;
        if (appState.enableMidterm && Number(midtermWeightInput.value) === 0) {
            regularWeightInput.value = 10;
            midtermWeightInput.value = 20;
            finalWeightInput.value = 70;
        } else if (!appState.enableMidterm) {
            const currentMid = Number(midtermWeightInput.value) || 0;
            regularWeightInput.value = (Number(regularWeightInput.value) || 0) + currentMid;
            midtermWeightInput.value = 0;
        }
        appState.regularWeight = parseFloat(regularWeightInput.value) || 0;
        appState.midtermWeight = parseFloat(midtermWeightInput.value) || 0;
        appState.finalWeight = parseFloat(finalWeightInput.value) || 0;

        updateInputModeUI();
        saveStateToStorage();
    });

    [regularWeightInput, midtermWeightInput, finalWeightInput].forEach((inputEl) => {
        inputEl.addEventListener('input', () => {
            appState.regularWeight = parseFloat(regularWeightInput.value) || 0;
            appState.midtermWeight = parseFloat(midtermWeightInput.value) || 0;
            appState.finalWeight = parseFloat(finalWeightInput.value) || 0;
            refreshAllCourseRowBadges();
            saveStateToStorage();
        });
    });

    // --- Sự kiện trên Danh sách môn học ---
    addCourseBtn.addEventListener('click', () => {
        createCourseRow();
        syncActiveSemesterFromDOM();
    });

    coursesContainer.addEventListener('input', (e) => {
        const row = e.target.closest('.course-row');
        if (row) {
            e.target.classList.remove('border-red-500');
            updateCourseRowBadge(row);
            syncActiveSemesterFromDOM();
        }
    });

    coursesContainer.addEventListener('change', (e) => {
        const row = e.target.closest('.course-row');
        if (row) {
            updateCourseRowBadge(row);
            syncActiveSemesterFromDOM();
        }
    });

    coursesContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-course-btn');
        if (removeBtn) {
            if (coursesContainer.children.length > 1) {
                removeBtn.closest('.course-row').remove();
                syncActiveSemesterFromDOM();
            } else {
                showError('Bạn phải có ít nhất một môn học trong học kỳ.');
            }
            return;
        }

        const customWeightBtn = e.target.closest('.toggle-custom-weight-btn');
        if (customWeightBtn) {
            const row = customWeightBtn.closest('.course-row');
            const customRow = row.querySelector('.custom-weights-row');
            const isNowCustom = row.dataset.useCustomWeights !== 'true';
            row.dataset.useCustomWeights = isNowCustom ? 'true' : 'false';
            customRow.classList.toggle('hidden', !isNowCustom);

            if (isNowCustom) {
                const cReg = row.querySelector('.custom-regular-weight');
                const cMid = row.querySelector('.custom-midterm-weight');
                const cFin = row.querySelector('.custom-final-weight');
                if (cReg.value === '') cReg.value = appState.regularWeight;
                if (cMid.value === '') cMid.value = appState.midtermWeight;
                if (cFin.value === '') cFin.value = appState.finalWeight;
            }
            updateCourseRowBadge(row);
            syncActiveSemesterFromDOM();
        }
    });

    // --- Nhập & Xuất file Excel ---
    downloadSampleBtn.addEventListener('click', () => {
        const sampleData = [
            ['Tên môn', 'Số TC', 'TB Thường kỳ', 'Điểm cuối kỳ'],
            ['Toán cao cấp A1', 3, 8.0, 7.5],
            ['Vật lý đại cương', 3, 7.0, 6.5],
            ['Lập trình C++', 4, 9.0, 8.5],
            ['Triết học Mác - Lênin', 3, 8.5, 0.0], // Minh họa điểm 0 vẫn hợp lệ
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Diem_Mau');
        worksheet['!cols'] = [{ wch: 30 }, { wch: 10 }, { wch: 15 }, { wch: 15 }];
        XLSX.writeFile(workbook, 'file_diem_mau.xlsx');
    });

    importExcelBtn.addEventListener('click', () => excelFileInput.click());

    // Kiểm tra một ô Excel có phải số hợp lệ không (bao gồm cả số 0!)
    const isValidExcelNumber = (val) => {
        if (val === undefined || val === null || String(val).trim() === '') return false;
        return !Number.isNaN(parseFloat(val));
    };

    excelFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (!jsonData || jsonData.length === 0) {
                    showError('File Excel rỗng hoặc không có dữ liệu.');
                    return;
                }

                let startIndex = jsonData.length > 0 && !isValidExcelNumber(jsonData[0][1]) ? 1 : 0;
                if (jsonData.length <= startIndex) {
                    showError('Không tìm thấy dữ liệu môn học hợp lệ trong file Excel.');
                    return;
                }

                const importedCourses = [];
                let detectedDirect10Mode = false;

                for (let i = startIndex; i < jsonData.length; i++) {
                    const rowData = jsonData[i];
                    if (!rowData || rowData.length < 3) continue;

                    const hasCredits = isValidExcelNumber(rowData[1]) && parseFloat(rowData[1]) > 0;
                    if (!hasCredits) continue;

                    // Hỗ trợ cả file 4 cột (Tên, TC, TK, CK) và file 3 cột (Tên, TC, Điểm hệ 10)
                    if (rowData.length >= 4 && isValidExcelNumber(rowData[2]) && isValidExcelNumber(rowData[3])) {
                        importedCourses.push({
                            ...createDefaultCourse(),
                            name: rowData[0] !== undefined ? String(rowData[0]).trim() : '',
                            credits: parseFloat(rowData[1]),
                            regularAvg: parseFloat(rowData[2]),
                            finalExam: parseFloat(rowData[3]),
                        });
                    } else if (isValidExcelNumber(rowData[2])) {
                        detectedDirect10Mode = true;
                        importedCourses.push({
                            ...createDefaultCourse(),
                            name: rowData[0] !== undefined ? String(rowData[0]).trim() : '',
                            credits: parseFloat(rowData[1]),
                            directGrade10: parseFloat(rowData[2]),
                        });
                    }
                }

                if (importedCourses.length === 0) {
                    showError('Không tìm thấy dòng môn học nào hợp lệ. Hãy kiểm tra lại các cột Số TC và Điểm.');
                    return;
                }

                if (detectedDirect10Mode && appState.inputMode !== 'direct10') {
                    appState.inputMode = 'direct10';
                } else if (!detectedDirect10Mode && appState.inputMode === 'letter') {
                    appState.inputMode = 'component';
                }

                const activeSem = getActiveSemester();
                activeSem.courses = importedCourses;
                renderActiveSemesterCourses();
                updateInputModeUI();
                saveStateToStorage();
                calculateBtn.click();
            } catch (error) {
                console.error('Lỗi khi đọc file Excel:', error);
                showError('Đã xảy ra lỗi khi xử lý file. Vui lòng kiểm tra định dạng file (.xlsx, .xls).');
            } finally {
                excelFileInput.value = '';
            }
        };
        reader.readAsArrayBuffer(file);
    });

    exportExcelBtn.addEventListener('click', () => {
        syncActiveSemesterFromDOM();
        const schoolName = universities.find((u) => u.id === appState.selectedSchoolId)?.name || appState.selectedSchoolId;

        const rows = [
            ['BẢNG ĐIỂM TỔNG HỢP GPA & CPA'],
            ['Trường:', schoolName],
            [],
            ['Học kỳ', 'Tên môn học', 'Số TC', 'Điểm TK/CC', 'Điểm Giữa kỳ', 'Điểm Cuối kỳ', 'Tổng kết hệ 10', 'Điểm chữ', 'Điểm hệ 4'],
        ];

        let grandCredits = 0;
        let grandPoints4 = 0;
        let grandPoints10 = 0;

        appState.semesters.forEach((sem) => {
            let semCredits = 0;
            let semPoints4 = 0;
            let semPoints10 = 0;

            sem.courses.forEach((course, idx) => {
                const evalRes = evaluateCourse(course, appState.selectedSchoolId);
                if (!evalRes.isValid) return;

                semCredits += evalRes.credits;
                semPoints4 += evalRes.gpa4 * evalRes.credits;
                semPoints10 += evalRes.effectiveGrade10 * evalRes.credits;

                rows.push([
                    sem.name,
                    course.name || `Môn học ${idx + 1}`,
                    evalRes.credits,
                    appState.inputMode === 'component' ? Number(course.regularAvg) : '-',
                    appState.inputMode === 'component' && appState.enableMidterm ? Number(course.midtermAvg) : '-',
                    appState.inputMode === 'component' ? Number(course.finalExam) : '-',
                    Number(evalRes.effectiveGrade10.toFixed(2)),
                    evalRes.letter,
                    Number(evalRes.gpa4.toFixed(2)),
                ]);
            });

            if (semCredits > 0) {
                const semGpa = semPoints4 / semCredits;
                const semG10 = semPoints10 / semCredits;
                rows.push([
                    `Tổng kết ${sem.name}`,
                    `Xếp loại: ${getClassification(semGpa)}`,
                    semCredits,
                    '',
                    '',
                    '',
                    Number(semG10.toFixed(2)),
                    '',
                    Number(semGpa.toFixed(2)),
                ]);
                rows.push([]);
                grandCredits += semCredits;
                grandPoints4 += semPoints4;
                grandPoints10 += semPoints10;
            }
        });

        if (grandCredits === 0) {
            showError('Chưa có môn học hợp lệ nào để xuất ra file Excel.');
            return;
        }

        const cpa = grandPoints4 / grandCredits;
        const cpa10 = grandPoints10 / grandCredits;
        rows.push([
            'TỔNG TÍCH LŨY TOÀN KHÓA (CPA)',
            `Xếp loại: ${getClassification(cpa)}`,
            grandCredits,
            '',
            '',
            '',
            Number(cpa10.toFixed(2)),
            '',
            Number(cpa.toFixed(2)),
        ]);

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        worksheet['!cols'] = [
            { wch: 24 },
            { wch: 30 },
            { wch: 10 },
            { wch: 12 },
            { wch: 14 },
            { wch: 14 },
            { wch: 16 },
            { wch: 10 },
            { wch: 12 },
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bang_Diem_GPA');
        XLSX.writeFile(workbook, 'bang_diem_gpa_cpa.xlsx');
    });

    // --- Tìm kiếm và Chọn Trường Đại học ---
    universitySearch.addEventListener('input', () => {
        populateUniversityList(universitySearch.value);
    });

    universitySearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstValidOption = universitySelect.querySelector('option:not([disabled])');
            if (firstValidOption && firstValidOption.value) {
                universitySelect.value = firstValidOption.value;
                universitySelect.dispatchEvent(new Event('change'));
            }
        }
    });

    universitySelect.addEventListener('change', (e) => {
        const selectedVal = e.target.value;
        if (!selectedVal || !gradingScales[selectedVal]) return;

        appState.selectedSchoolId = selectedVal;
        updateSelectedSchoolBadge();
        showConversionTable(selectedVal);
        refreshAllCourseRowBadges();
        saveStateToStorage();

        if (!resultContainer.classList.contains('hidden')) {
            calculateBtn.click();
        }
    });

    // --- Tính toán GPA Học kỳ & CPA Tích lũy ---
    calculateBtn.addEventListener('click', () => {
        syncActiveSemesterFromDOM();
        const schoolId = appState.selectedSchoolId;

        if (appState.inputMode === 'component') {
            const regW = parseFloat(regularWeightInput.value) || 0;
            const midW = appState.enableMidterm ? parseFloat(midtermWeightInput.value) || 0 : 0;
            const finW = parseFloat(finalWeightInput.value) || 0;
            const totalW = Math.round((regW + midW + finW) * 100) / 100;
            if (totalW !== 100) {
                showError(`Tổng tỷ lệ điểm thành phần mặc định hiện tại là ${totalW}%. Vui lòng điều chỉnh để tổng bằng 100%.`);
                return;
            }
        }

        errorMessageEl.classList.add('hidden');
        coursesContainer.querySelectorAll('.border-red-500').forEach((el) => el.classList.remove('border-red-500'));

        const courseRows = coursesContainer.querySelectorAll('.course-row');
        let semCredits = 0;
        let semWeightedPoints4 = 0;
        let semWeightedPoints10 = 0;
        let hasPartialOrInvalidRow = false;
        let customWeightErrorMsg = '';

        courseRows.forEach((row, index) => {
            const nameVal = row.querySelector('.course-name').value.trim();
            const creditsInput = row.querySelector('.credits');
            const regularInput = row.querySelector('.regular-avg');
            const midtermInput = row.querySelector('.midterm-avg');
            const finalInput = row.querySelector('.final-exam');
            const direct10Input = row.querySelector('.direct-grade10');
            const letterSelect = row.querySelector('.letter-grade');

            const isSingleRow = courseRows.length === 1;
            let rowTouched = isSingleRow || nameVal !== '' || creditsInput.value !== '';

            if (appState.inputMode === 'component') {
                rowTouched = rowTouched || regularInput.value !== '' || finalInput.value !== '' || (appState.enableMidterm && midtermInput.value !== '');
            } else if (appState.inputMode === 'direct10') {
                rowTouched = rowTouched || direct10Input.value !== '';
            } else if (appState.inputMode === 'letter') {
                rowTouched = rowTouched || creditsInput.value !== '';
            }

            if (!rowTouched) return;

            let rowValid = true;
            const credits = parseFloat(creditsInput.value);
            if (Number.isNaN(credits) || credits <= 0) {
                creditsInput.classList.add('border-red-500');
                rowValid = false;
            }

            if (appState.inputMode === 'component') {
                if (!isNumericInputValid(regularInput.value, 0, 10)) {
                    regularInput.classList.add('border-red-500');
                    rowValid = false;
                }
                if (appState.enableMidterm && !isNumericInputValid(midtermInput.value, 0, 10)) {
                    midtermInput.classList.add('border-red-500');
                    rowValid = false;
                }
                if (!isNumericInputValid(finalInput.value, 0, 10)) {
                    finalInput.classList.add('border-red-500');
                    rowValid = false;
                }

                if (row.dataset.useCustomWeights === 'true') {
                    const cReg = parseFloat(row.querySelector('.custom-regular-weight').value) || 0;
                    const cMid = appState.enableMidterm ? parseFloat(row.querySelector('.custom-midterm-weight').value) || 0 : 0;
                    const cFin = parseFloat(row.querySelector('.custom-final-weight').value) || 0;
                    if (Math.round((cReg + cMid + cFin) * 100) / 100 !== 100) {
                        customWeightErrorMsg = `Tổng tỷ lệ điểm riêng của môn thứ ${index + 1} phải bằng 100%.`;
                        rowValid = false;
                    }
                }
            } else if (appState.inputMode === 'direct10') {
                if (!isNumericInputValid(direct10Input.value, 0, 10)) {
                    direct10Input.classList.add('border-red-500');
                    rowValid = false;
                }
            }

            if (!rowValid) {
                hasPartialOrInvalidRow = true;
                return;
            }

            const activeSem = getActiveSemester();
            const evalRes = evaluateCourse(activeSem.courses[index], schoolId);
            if (evalRes.isValid) {
                semCredits += evalRes.credits;
                semWeightedPoints4 += evalRes.gpa4 * evalRes.credits;
                semWeightedPoints10 += evalRes.effectiveGrade10 * evalRes.credits;
            }
        });

        if (customWeightErrorMsg) {
            showError(customWeightErrorMsg);
            return;
        }

        if (hasPartialOrInvalidRow) {
            showError('Một số ô thông tin môn học bị bỏ trống hoặc ngoài khoảng hợp lệ (Số TC > 0, Điểm từ 0 đến 10). Vui lòng kiểm tra các ô viền đỏ.');
            if (semCredits === 0) {
                resultContainer.classList.add('hidden');
                return;
            }
        }

        if (semCredits === 0) {
            showError('Vui lòng nhập ít nhất một môn học hợp lệ (Tín chỉ > 0 và Điểm từ 0 đến 10).');
            resultContainer.classList.add('hidden');
            if (adContainer) adContainer.classList.add('hidden');
            return;
        }

        const semGpa = semWeightedPoints4 / semCredits;
        const semGrade10 = semWeightedPoints10 / semCredits;

        // Tính CPA tích lũy trên toàn bộ các học kỳ
        let cpaCredits = 0;
        let cpaWeightedPoints4 = 0;
        let cpaWeightedPoints10 = 0;

        appState.semesters.forEach((sem) => {
            sem.courses.forEach((course) => {
                const evalRes = evaluateCourse(course, schoolId);
                if (evalRes.isValid) {
                    cpaCredits += evalRes.credits;
                    cpaWeightedPoints4 += evalRes.gpa4 * evalRes.credits;
                    cpaWeightedPoints10 += evalRes.effectiveGrade10 * evalRes.credits;
                }
            });
        });

        const cpa = cpaCredits > 0 ? cpaWeightedPoints4 / cpaCredits : semGpa;
        const cpaGrade10 = cpaCredits > 0 ? cpaWeightedPoints10 / cpaCredits : semGrade10;

        const activeSem = getActiveSemester();
        if (semesterResultLabelEl && activeSem) {
            semesterResultLabelEl.textContent = `GPA ${activeSem.name}`;
        }

        gpaResultEl.textContent = semGpa.toFixed(2);
        classificationResultEl.textContent = getClassification(semGpa);
        if (semesterCreditsResultEl) semesterCreditsResultEl.textContent = semCredits;
        if (semesterGrade10ResultEl) semesterGrade10ResultEl.textContent = semGrade10.toFixed(2);

        if (cpaResultEl) cpaResultEl.textContent = cpa.toFixed(2);
        if (cpaClassificationResultEl) cpaClassificationResultEl.textContent = getClassification(cpa);
        if (totalCreditsResultEl) totalCreditsResultEl.textContent = cpaCredits;
        if (cpaGrade10ResultEl) cpaGrade10ResultEl.textContent = cpaGrade10.toFixed(2);

        resultContainer.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Tự động điền vào công cụ đặt mục tiêu nếu đang trống
        if (goalCurrentCreditsInput && goalCurrentCreditsInput.value === '') {
            goalCurrentCreditsInput.value = cpaCredits;
        }
        if (goalCurrentCpaInput && goalCurrentCpaInput.value === '') {
            goalCurrentCpaInput.value = cpa.toFixed(2);
        }

        // Hiển thị quảng cáo AdSense an toàn (chỉ push 1 lần duy nhất)
        if (adContainer) {
            adContainer.classList.remove('hidden');
            if (!adInitialized) {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    adInitialized = true;
                } catch (adErr) {
                    console.warn('AdSense skipped:', adErr);
                }
            }
        }

        geminiFeedbackSection.classList.remove('hidden');
        getFeedbackBtn.classList.remove('hidden');
        feedbackResult.classList.add('hidden');
        feedbackLoading.classList.add('hidden');
        feedbackResult.innerHTML = '';
    });

    // --- Công cụ Đặt Mục tiêu CPA (GPA Goal Calculator) ---
    syncGoalFromCpaBtn.addEventListener('click', () => {
        syncActiveSemesterFromDOM();
        let cpaCredits = 0;
        let cpaPoints4 = 0;
        appState.semesters.forEach((sem) => {
            sem.courses.forEach((course) => {
                const evalRes = evaluateCourse(course, appState.selectedSchoolId);
                if (evalRes.isValid) {
                    cpaCredits += evalRes.credits;
                    cpaPoints4 += evalRes.gpa4 * evalRes.credits;
                }
            });
        });

        if (cpaCredits === 0) {
            showError('Hãy nhập môn học và tính GPA trước khi đồng bộ sang mục tiêu.');
            return;
        }

        goalCurrentCreditsInput.value = cpaCredits;
        goalCurrentCpaInput.value = (cpaPoints4 / cpaCredits).toFixed(2);
        if (!goalRemainingCreditsInput.value) {
            goalRemainingCreditsInput.value = Math.max(15, 120 - cpaCredits);
        }
        calculateGoalBtn.click();
    });

    document.querySelectorAll('.goal-preset-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            goalTargetCpaInput.value = btn.dataset.target;
            if (goalCurrentCreditsInput.value && goalCurrentCpaInput.value && goalRemainingCreditsInput.value) {
                calculateGoalBtn.click();
            }
        });
    });

    calculateGoalBtn.addEventListener('click', () => {
        const currentCredits = parseFloat(goalCurrentCreditsInput.value);
        const currentCpa = parseFloat(goalCurrentCpaInput.value);
        const remainingCredits = parseFloat(goalRemainingCreditsInput.value);
        const targetCpa = parseFloat(goalTargetCpaInput.value);

        if (
            Number.isNaN(currentCredits) || currentCredits < 0 ||
            Number.isNaN(currentCpa) || currentCpa < 0 || currentCpa > 4 ||
            Number.isNaN(remainingCredits) || remainingCredits <= 0 ||
            Number.isNaN(targetCpa) || targetCpa <= 0 || targetCpa > 4
        ) {
            goalResultBox.className = 'mt-4 p-4 rounded-xl border bg-red-50 border-red-200 text-red-700 text-sm';
            goalResultBox.textContent = 'Vui lòng nhập đầy đủ Số tín chỉ đã học (≥ 0), CPA hiện tại (0 - 4.0), Số tín chỉ dự kiến học thêm (> 0) và CPA mục tiêu (0 - 4.0).';
            goalResultBox.classList.remove('hidden');
            return;
        }

        const totalFutureCredits = currentCredits + remainingCredits;
        const requiredPoints = targetCpa * totalFutureCredits - currentCpa * currentCredits;
        const requiredGpa = requiredPoints / remainingCredits;
        const maxPossibleCpa = (currentCpa * currentCredits + 4.0 * remainingCredits) / totalFutureCredits;

        goalResultBox.classList.remove('hidden');

        if (requiredGpa > 4.0) {
            const minExtraCreditsForTarget = targetCpa < 4.0
                ? Math.ceil(((targetCpa - currentCpa) * currentCredits) / (4.0 - targetCpa))
                : '∞';
            goalResultBox.className = 'mt-4 p-4 rounded-xl border bg-amber-50 border-amber-300 text-amber-900 text-sm space-y-1';
            goalResultBox.innerHTML = `
                <p class="font-bold text-amber-800">⚠️ Mục tiêu CPA ${targetCpa.toFixed(2)} vượt quá giới hạn tối đa với ${remainingCredits} tín chỉ còn lại!</p>
                <p>Để đạt CPA <strong>${targetCpa.toFixed(2)}</strong>, bạn cần GPA trung bình <strong>${requiredGpa.toFixed(2)} / 4.00</strong> trong ${remainingCredits} tín chỉ tới.</p>
                <p>💡 <strong>Giải pháp:</strong> Ngay cả khi đạt tuyệt đối <strong>4.00</strong> ở ${remainingCredits} TC tới, CPA tối đa của bạn là <strong>${maxPossibleCpa.toFixed(2)}</strong>. Bạn nên đăng ký học cải thiện các môn điểm thấp (D, D+, C) hoặc cần tối thiểu <strong>${minExtraCreditsForTarget} tín chỉ</strong> đạt điểm A (4.0) để chạm mốc ${targetCpa.toFixed(2)}.</p>
            `;
        } else if (requiredGpa <= 0) {
            goalResultBox.className = 'mt-4 p-4 rounded-xl border bg-emerald-50 border-emerald-300 text-emerald-900 text-sm';
            goalResultBox.innerHTML = `
                <p class="font-bold text-emerald-800">🎉 Bạn đã vượt xa mục tiêu này!</p>
                <p>CPA hiện tại (${currentCpa.toFixed(2)}) đã đủ để giữ vững mục tiêu ${targetCpa.toFixed(2)}. Hãy duy trì phong độ hoặc đặt mục tiêu cao hơn!</p>
            `;
        } else {
            const isHard = requiredGpa >= 3.5;
            goalResultBox.className = `mt-4 p-4 rounded-xl border text-sm space-y-1 ${
                isHard ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`;
            goalResultBox.innerHTML = `
                <p class="font-bold text-base">🎯 Kết quả: Bạn cần đạt GPA trung bình tối thiểu <span class="underline">${requiredGpa.toFixed(2)} / 4.00</span> trong ${remainingCredits} tín chỉ tới.</p>
                <p>Mức xếp loại mục tiêu: <strong>${getClassification(targetCpa)} (${targetCpa.toFixed(2)})</strong> • Mức độ khả thi: <strong>${
                requiredGpa >= 3.6 ? 'Thử thách cao (Cần chủ yếu điểm A và B+)' : requiredGpa >= 3.0 ? 'Khả thi (Cần duy trì mức B và B+)' : 'Rất khả thi'
            }</strong>.</p>
            `;
        }
    });

    // --- Tư vấn AI (Gemini 3.8 Flash) & Bộ Render Markdown An toàn ---
    const escapeHtml = (unsafe) => {
        return String(unsafe)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const formatInlineMarkdown = (escapedLine) => {
        return escapedLine
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code class="bg-purple-100 text-purple-900 px-1 rounded text-xs">$1</code>');
    };

    // Chuyển đổi Markdown sang HTML an toàn, tuyệt đối không làm hỏng số thập phân (VD: 3.50, 8.5)
    const renderSafeMarkdown = (markdownText) => {
        const lines = String(markdownText || '').split(/\r?\n/);
        let html = '';
        let inUl = false;
        let inOl = false;

        const closeLists = () => {
            if (inUl) {
                html += '</ul>';
                inUl = false;
            }
            if (inOl) {
                html += '</ol>';
                inOl = false;
            }
        };

        lines.forEach((rawLine) => {
            const trimmed = rawLine.trim();
            if (!trimmed) {
                closeLists();
                return;
            }

            const escaped = escapeHtml(trimmed);

            // Tiêu đề ###, ##, #
            const headingMatch = escaped.match(/^(#{1,4})\s+(.+)$/);
            if (headingMatch) {
                closeLists();
                const level = Math.min(4, headingMatch[1].length + 1);
                html += `<h${level}>${formatInlineMarkdown(headingMatch[2])}</h${level}>`;
                return;
            }

            // Danh sách có thứ tự ở ĐẦU DÒNG: "1. Nội dung"
            const olMatch = escaped.match(/^(\d+)\.\s+(.+)$/);
            if (olMatch) {
                if (inUl) {
                    html += '</ul>';
                    inUl = false;
                }
                if (!inOl) {
                    html += '<ol>';
                    inOl = true;
                }
                html += `<li>${formatInlineMarkdown(olMatch[2])}</li>`;
                return;
            }

            // Danh sách gạch đầu dòng ở ĐẦU DÒNG: "- Nội dung" hoặc "* Nội dung"
            const ulMatch = escaped.match(/^[-*•]\s+(.+)$/);
            if (ulMatch) {
                if (inOl) {
                    html += '</ol>';
                    inOl = false;
                }
                if (!inUl) {
                    html += '<ul>';
                    inUl = true;
                }
                html += `<li>${formatInlineMarkdown(ulMatch[1])}</li>`;
                return;
            }

            closeLists();
            html += `<p>${formatInlineMarkdown(escaped)}</p>`;
        });

        closeLists();
        return html;
    };

    const fetchGeminiFeedback = async (prompt) => {
        const proxyUrl = '/.netlify/functions/call-gemini';

        try {
            const response = await fetch(proxyUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const text =
                result.text ||
                result.interaction?.output_text ||
                result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                return text;
            }
            return 'Rất tiếc, AI không thể đưa ra phản hồi lúc này. Vui lòng thử lại sau.';
        } catch (error) {
            console.error('Error calling proxy function:', error);
            return 'Đã xảy ra lỗi khi kết nối với AI. Vui lòng kiểm tra lại kết nối mạng hoặc cấu hình GEMINI_API_KEY và thử lại.';
        }
    };

    getFeedbackBtn.addEventListener('click', async () => {
        syncActiveSemesterFromDOM();
        getFeedbackBtn.classList.add('hidden');
        feedbackLoading.classList.remove('hidden');
        feedbackResult.classList.add('hidden');

        const gpa = gpaResultEl.textContent;
        const classification = classificationResultEl.textContent;
        const cpa = cpaResultEl ? cpaResultEl.textContent : gpa;
        const totalCredits = totalCreditsResultEl ? totalCreditsResultEl.textContent : '';

        const selectedUniObj = universities.find((u) => u.id === appState.selectedSchoolId) || universities[0];
        const selectedSchool = selectedUniObj.name;

        const activeSem = getActiveSemester();
        const courseDetails = [];

        activeSem.courses.forEach((course, idx) => {
            const evalRes = evaluateCourse(course, appState.selectedSchoolId);
            if (!evalRes.isValid) return;

            const name = course.name || `Môn học ${idx + 1}`;
            let componentBreakdown = '';
            if (appState.inputMode === 'component') {
                componentBreakdown = appState.enableMidterm
                    ? ` (Thường kỳ: ${course.regularAvg}, Giữa kỳ: ${course.midtermAvg}, Cuối kỳ: ${course.finalExam})`
                    : ` (Thường kỳ: ${course.regularAvg}, Cuối kỳ: ${course.finalExam})`;
            }
            courseDetails.push(
                `- ${name} (${evalRes.credits} TC): Tổng kết hệ 10 = ${evalRes.effectiveGrade10.toFixed(1)}, Điểm chữ = ${evalRes.letter}, Hệ 4 = ${evalRes.gpa4.toFixed(1)}${componentBreakdown}`
            );
        });

        const goalInfo =
            goalTargetCpaInput && goalTargetCpaInput.value && goalRemainingCreditsInput && goalRemainingCreditsInput.value
                ? `\n- Mục tiêu sinh viên đang hướng tới: Đạt CPA ${goalTargetCpaInput.value} với ${goalRemainingCreditsInput.value} tín chỉ còn lại.`
                : '';

        const userPrompt = `Hãy phân tích kết quả học tập của một sinh viên đại học và đưa ra chiến lược học tập cụ thể:
- Trường: ${selectedSchool}
- Học kỳ đang xét: ${activeSem.name} | GPA học kỳ: ${gpa} (${classification})
- CPA tích lũy toàn khóa: ${cpa} (Tổng ${totalCredits} tín chỉ)${goalInfo}
- Chi tiết các môn học trong ${activeSem.name}:
${courseDetails.join('\n')}

Dựa trên số liệu trên, hãy trình bày rõ ràng bằng Markdown:
1. **Đánh giá tổng quan & Khích lệ**: Nhận xét tích cực về kết quả hiện tại của sinh viên.
2. **Phân tích Điểm mạnh & Tương quan điểm thành phần**: Chỉ ra các môn đạt kết quả tốt và nhận xét sự chênh lệch giữa điểm quá trình (Thường kỳ/Giữa kỳ) với điểm thi Cuối kỳ (nếu có).
3. **Các môn cần ưu tiên cải thiện**: Xác định môn học nào có số tín chỉ lớn đang kéo GPA xuống và tính toán nếu cải thiện môn đó lên mức B+ hoặc A thì GPA sẽ tăng khoảng bao nhiêu.
4. **Chiến lược học tập kỳ tới**: Đề xuất 3 hành động cụ thể, thiết thực để sinh viên nâng cao GPA/CPA trong học kỳ tiếp theo.`;

        const feedbackText = await fetchGeminiFeedback(userPrompt);
        feedbackResult.innerHTML = renderSafeMarkdown(feedbackText);
        feedbackLoading.classList.add('hidden');
        feedbackResult.classList.remove('hidden');
    });

    // --- Khởi tạo ứng dụng ---
    loadStateFromStorage();

    // Đồng bộ trạng thái lên các điều khiển UI
    roundGrade10Checkbox.checked = Boolean(appState.roundGrade10);
    enableMidtermCheckbox.checked = Boolean(appState.enableMidterm);
    regularWeightInput.value = appState.regularWeight;
    midtermWeightInput.value = appState.midtermWeight;
    finalWeightInput.value = appState.finalWeight;

    populateUniversityList();
    updateSelectedSchoolBadge();
    renderSemesterTabs();
    renderActiveSemesterCourses();
    updateInputModeUI();
    showConversionTable(appState.selectedSchoolId, true);
});
