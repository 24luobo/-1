document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeChat();
    initializeDiary();
    initializeCalculators();
    initializeTools();
    initializeEmergency();
    initializeGoals();
    initializePlan();
    initializeStatistics();
    initializeCheckin();
    initializeSelfTest();
    initializeQuiz();
    initializeCommunity();
    initializeAnalysis();
    initializeAIChat();
    updateHeaderStats();
    generateCalendar();
});

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    const qaDatabase = {
        "骨折愈合需要多长时间": "骨折愈合时间因年龄、骨折部位和严重程度而异。一般来说，血肿形成期约1-2周，纤维软骨痂形成期约2-6周，骨痂形成期约6-12周，骨痂重塑期需要6个月到1年。",
        "什么时候可以开始康复训练": "在医生允许的情况下，通常在骨折固定后24-48小时内就可以开始早期康复训练，如手指活动、肌肉等长收缩等。具体时间请遵医嘱。",
        "康复训练会痛吗": "正常的康复训练可能会有轻微不适，但不应该有剧烈疼痛。如果训练时感到剧烈疼痛，应立即停止并咨询医生。",
        "如何判断康复进度": "可以通过关节活动度、肌肉力量、疼痛程度、日常生活能力等指标来评估康复进度。定期复查X光片也是重要参考。",
        "康复期间需要注意什么": "康复期间要注意：循序渐进、避免过度训练、保持良好心态、合理营养、定期复查、遵医嘱用药。",
        "可以做什么运动": "根据康复阶段不同，可以做手指活动、腕关节活动、肩部钟摆运动、肌肉等长收缩、等张肌力训练等。具体请咨询康复治疗师。",
        "饮食有什么建议": "建议摄入高蛋白、高钙、富含维生素D和维生素C的食物，如鱼、肉、蛋、奶、深绿色蔬菜、柑橘类水果等。避免辛辣刺激食物。",
        "如何预防并发症": "预防并发症的方法包括：早期开始康复训练、定期复查、保持伤口清洁、适当活动、合理营养、遵医嘱用药。",
        "什么时候可以恢复正常工作": "这取决于骨折部位、严重程度和工作性质。一般需要3-6个月，具体请咨询医生。",
        "康复训练频率如何": "建议每天进行康复训练，每次30-60分钟，分2-3次进行。具体频率请根据个人情况和医生建议调整。"
    };

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(question) {
        for (let key in qaDatabase) {
            if (question.includes(key)) {
                return qaDatabase[key];
            }
        }
        return "抱歉，我暂时没有找到相关答案。建议您咨询专业医生或康复治疗师。您可以尝试询问关于骨折愈合时间、康复训练、饮食建议等问题。";
    }

    function handleSend() {
        const question = userInput.value.trim();
        if (question) {
            addMessage(question, true);
            setTimeout(() => {
                const response = getResponse(question);
                addMessage(response);
            }, 500);
            userInput.value = '';
        }
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
}

function initializeDiary() {
    const saveBtn = document.getElementById('saveDiaryBtn');
    const diaryList = document.getElementById('diaryList');

    let diaries = JSON.parse(localStorage.getItem('rehabDiaries')) || [];

    function renderDiaries() {
        diaryList.innerHTML = '';
        diaries.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(diary => {
            const diaryDiv = document.createElement('div');
            diaryDiv.className = 'diary-item';
            diaryDiv.innerHTML = `
                <div class="diary-date">${diary.date}</div>
                <div class="diary-mood">感受：${diary.mood}</div>
                <div class="diary-content">${diary.content}</div>
            `;
            diaryList.appendChild(diaryDiv);
        });
    }

    saveBtn.addEventListener('click', function() {
        const date = document.getElementById('diaryDate').value;
        const mood = document.getElementById('diaryMood').value;
        const content = document.getElementById('diaryContent').value;

        if (date && content) {
            diaries.push({ date, mood, content });
            localStorage.setItem('rehabDiaries', JSON.stringify(diaries));
            renderDiaries();
            document.getElementById('diaryContent').value = '';
            alert('日记保存成功！');
        } else {
            alert('请填写日期和内容');
        }
    });

    renderDiaries();
}

function initializeCalculators() {
    window.calculateBMI = function() {
        const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
        const weight = parseFloat(document.getElementById('bmiWeight').value);
        
        if (height && weight) {
            const bmi = (weight / (height * height)).toFixed(1);
            let category = '';
            if (bmi < 18.5) category = '偏瘦';
            else if (bmi < 24) category = '正常';
            else if (bmi < 28) category = '偏胖';
            else category = '肥胖';
            
            document.getElementById('bmiResult').innerHTML = `BMI: ${bmi}<br>分类: ${category}`;
        } else {
            alert('请输入身高和体重');
        }
    };

    window.calculateGripIndex = function() {
        const gripForce = parseFloat(document.getElementById('gripForce').value);
        const bodyWeight = parseFloat(document.getElementById('bodyWeight').value);
        
        if (gripForce && bodyWeight) {
            const gripIndex = (gripForce / bodyWeight * 100).toFixed(1);
            let evaluation = '';
            if (gripIndex < 40) evaluation = '较弱';
            else if (gripIndex < 60) evaluation = '一般';
            else if (gripIndex < 80) evaluation = '良好';
            else evaluation = '优秀';
            
            document.getElementById('gripResult').innerHTML = `握力指数: ${gripIndex}%<br>评价: ${evaluation}`;
        } else {
            alert('请输入握力和体重');
        }
    };

    window.calculateROM = function() {
        const jointAngle = parseFloat(document.getElementById('jointAngle').value);
        const normalAngle = parseFloat(document.getElementById('normalAngle').value);
        
        if (jointAngle && normalAngle) {
            const romPercent = ((jointAngle / normalAngle) * 100).toFixed(1);
            let evaluation = '';
            if (romPercent < 50) evaluation = '较差';
            else if (romPercent < 75) evaluation = '一般';
            else if (romPercent < 90) evaluation = '良好';
            else evaluation = '优秀';
            
            document.getElementById('romResult').innerHTML = `关节活动度: ${romPercent}%<br>评价: ${evaluation}`;
        } else {
            alert('请输入关节角度和正常角度');
        }
    };

    window.calculateIntensity = function() {
        const maxWeight = parseFloat(document.getElementById('maxWeight').value);
        const trainingWeight = parseFloat(document.getElementById('trainingWeight').value);
        
        if (maxWeight && trainingWeight) {
            const intensity = ((trainingWeight / maxWeight) * 100).toFixed(1);
            let level = '';
            if (intensity < 30) level = '低强度';
            else if (intensity < 50) level = '中低强度';
            else if (intensity < 70) level = '中等强度';
            else if (intensity < 85) level = '中高强度';
            else level = '高强度';
            
            document.getElementById('intensityResult').innerHTML = `训练强度: ${intensity}%<br>等级: ${level}`;
        } else {
            alert('请输入最大重量和训练重量');
        }
    };
}

function initializeTools() {
    let timerInterval = null;
    let timerSeconds = 0;
    let counter = 0;

    window.startTimer = function() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                timerSeconds++;
                const minutes = Math.floor(timerSeconds / 60);
                const seconds = timerSeconds % 60;
                document.getElementById('timerDisplay').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
    };

    window.stopTimer = function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    };

    window.resetTimer = function() {
        stopTimer();
        timerSeconds = 0;
        document.getElementById('timerDisplay').textContent = '00:00';
    };

    window.incrementCounter = function() {
        counter++;
        document.getElementById('counterDisplay').textContent = counter;
    };

    window.resetCounter = function() {
        counter = 0;
        document.getElementById('counterDisplay').textContent = '0';
    };

    window.setReminder = function() {
        const time = document.getElementById('reminderTime').value;
        if (time) {
            alert(`已设置提醒时间：${time}`);
        } else {
            alert('请选择提醒时间');
        }
    };

    window.saveMeasurement = function() {
        const value = document.getElementById('measureValue').value;
        if (value) {
            alert(`测量记录已保存：${value}`);
            document.getElementById('measureValue').value = '';
        } else {
            alert('请输入测量值');
        }
    };
}

function initializeEmergency() {
    window.callEmergency = function(number) {
        if (confirm(`确定要拨打急救电话 ${number} 吗？`)) {
            alert(`正在拨打 ${number}...`);
        }
    };

    window.saveDoctorInfo = function() {
        const name = document.getElementById('doctorName').value;
        const phone = document.getElementById('doctorPhone').value;
        if (name && phone) {
            localStorage.setItem('doctorInfo', JSON.stringify({ name, phone }));
            alert('医生信息已保存');
        } else {
            alert('请填写完整信息');
        }
    };

    window.callDoctor = function() {
        const doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
        if (doctorInfo && doctorInfo.phone) {
            if (confirm(`确定要联系医生 ${doctorInfo.name} 吗？`)) {
                alert(`正在联系医生：${doctorInfo.phone}`);
            }
        } else {
            alert('请先保存医生信息');
        }
    };

    window.saveEmergencyContact = function() {
        const name = document.getElementById('emergencyName').value;
        const phone = document.getElementById('emergencyPhone').value;
        if (name && phone) {
            localStorage.setItem('emergencyContact', JSON.stringify({ name, phone }));
            alert('紧急联系人信息已保存');
        } else {
            alert('请填写完整信息');
        }
    };

    window.callEmergencyContact = function() {
        const contact = JSON.parse(localStorage.getItem('emergencyContact'));
        if (contact && contact.phone) {
            if (confirm(`确定要联系 ${contact.name} 吗？`)) {
                alert(`正在联系：${contact.phone}`);
            }
        } else {
            alert('请先保存紧急联系人信息');
        }
    };

    window.saveHospitalInfo = function() {
        const name = document.getElementById('hospitalName').value;
        const address = document.getElementById('hospitalAddress').value;
        if (name && address) {
            localStorage.setItem('hospitalInfo', JSON.stringify({ name, address }));
            alert('医院信息已保存');
        } else {
            alert('请填写完整信息');
        }
    };
}

function initializeGoals() {
    let goals = JSON.parse(localStorage.getItem('rehabGoals')) || [];

    function renderGoals() {
        const goalsList = document.getElementById('goalsList');
        goalsList.innerHTML = '';
        goals.forEach((goal, index) => {
            const goalDiv = document.createElement('div');
            goalDiv.className = 'goal-item';
            goalDiv.innerHTML = `
                <div class="goal-description">${goal.description}</div>
                <div class="goal-type">类型：${goal.type}</div>
                <div class="goal-deadline">截止日期：${goal.deadline}</div>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${goal.progress}%"></div>
                    </div>
                </div>
                <button onclick="updateGoalProgress(${index})" class="btn-small" style="margin-top: 10px;">更新进度</button>
                <button onclick="deleteGoal(${index})" class="btn-small" style="margin-top: 10px; background: #ff4757;">删除</button>
            `;
            goalsList.appendChild(goalDiv);
        });
    }

    window.addGoal = function() {
        const description = document.getElementById('goalDescription').value;
        const type = document.getElementById('goalType').value;
        const deadline = document.getElementById('goalDeadline').value;

        if (description && deadline) {
            goals.push({ description, type, deadline, progress: 0 });
            localStorage.setItem('rehabGoals', JSON.stringify(goals));
            renderGoals();
            document.getElementById('goalDescription').value = '';
            document.getElementById('goalDeadline').value = '';
            alert('目标添加成功！');
        } else {
            alert('请填写完整信息');
        }
    };

    window.updateGoalProgress = function(index) {
        const progress = prompt('请输入当前进度（0-100）：');
        if (progress !== null && !isNaN(progress)) {
            goals[index].progress = Math.min(100, Math.max(0, parseInt(progress)));
            localStorage.setItem('rehabGoals', JSON.stringify(goals));
            renderGoals();
        }
    };

    window.deleteGoal = function(index) {
        if (confirm('确定要删除这个目标吗？')) {
            goals.splice(index, 1);
            localStorage.setItem('rehabGoals', JSON.stringify(goals));
            renderGoals();
        }
    };

    renderGoals();
}

function initializePlan() {
    const plans = {
        acute: {
            title: '急性期训练计划（1-2周）',
            exercises: [
                '手指屈伸训练：每天10-15次，每次3组',
                '腕关节被动活动：在无痛范围内缓慢活动',
                '肩部钟摆运动：身体前倾，手臂自然下垂做圆周运动',
                '肌肉等长收缩：在不移动关节的情况下收缩肌肉',
                '深呼吸训练：每天3-5次，每次10次'
            ]
        },
        subacute: {
            title: '亚急性期训练计划（3-6周）',
            exercises: [
                '主动关节活动训练：逐渐增加活动范围',
                '等张肌力训练：使用弹力带进行抗阻训练',
                '协调性训练：精细动作练习',
                '日常生活活动训练：穿衣、洗漱等',
                '握力训练：使用握力器或橡皮球'
            ]
        },
        recovery: {
            title: '恢复期训练计划（7-12周）',
            exercises: [
                '强化训练：渐进式抗阻训练',
                '功能性训练：模拟日常活动',
                '耐力训练：有氧运动结合',
                '运动技能训练：专项运动恢复',
                '平衡训练：提高身体协调性'
            ]
        }
    };

    window.generatePlan = function() {
        const stage = document.getElementById('planStage').value;
        const frequency = document.getElementById('planFrequency').value;
        const duration = document.getElementById('planDuration').value;

        if (duration) {
            const plan = plans[stage];
            const planDisplay = document.getElementById('planDisplay');
            
            const frequencyText = {
                'daily': '每天',
                'every2days': '每2天',
                'weekly': '每周'
            };

            planDisplay.innerHTML = `
                <h3 style="margin-bottom: 15px; color: #667eea;">${plan.title}</h3>
                <p style="margin-bottom: 15px;"><strong>训练频率：</strong>${frequencyText[frequency]}</p>
                <p style="margin-bottom: 15px;"><strong>训练时长：</strong>${duration}分钟/次</p>
                <div style="background: white; padding: 15px; border-radius: 10px;">
                    <h4 style="margin-bottom: 10px;">训练内容：</h4>
                    <ul style="padding-left: 20px; line-height: 2;">
                        ${plan.exercises.map(exercise => `<li>${exercise}</li>`).join('')}
                    </ul>
                </div>
                <button onclick="downloadPlan()" class="btn-primary" style="margin-top: 15px;">下载计划</button>
            `;
        } else {
            alert('请输入训练时长');
        }
    };

    window.downloadPlan = function() {
        alert('计划已下载到本地');
    };
}

function initializeStatistics() {
    const stats = JSON.parse(localStorage.getItem('rehabStats')) || {
        trainingProgress: 65,
        romProgress: 70,
        strengthProgress: 55,
        painProgress: 80
    };

    document.getElementById('trainingProgress').style.width = stats.trainingProgress + '%';
    document.getElementById('trainingPercent').textContent = stats.trainingProgress + '%';

    document.getElementById('romProgress').style.width = stats.romProgress + '%';
    document.getElementById('romPercent').textContent = stats.romProgress + '%';

    document.getElementById('strengthProgress').style.width = stats.strengthProgress + '%';
    document.getElementById('strengthPercent').textContent = stats.strengthProgress + '%';

    document.getElementById('painProgress').style.width = stats.painProgress + '%';
    document.getElementById('painPercent').textContent = stats.painProgress + '%';
}

function initializeCheckin() {
    let checkins = JSON.parse(localStorage.getItem('checkins')) || [];

    window.submitCheckin = function() {
        const today = new Date().toISOString().split('T')[0];
        const items = [
            document.getElementById('checkin1').checked,
            document.getElementById('checkin2').checked,
            document.getElementById('checkin3').checked,
            document.getElementById('checkin4').checked
        ];

        if (items.some(item => item)) {
            checkins.push({ date: today, items });
            localStorage.setItem('checkins', JSON.stringify(checkins));
            generateCalendar();
            alert('打卡成功！');
        } else {
            alert('请至少完成一项任务');
        }
    };

    window.generateCalendar = function() {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = day;

            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const isChecked = checkins.some(checkin => checkin.date === dateStr);

            if (isChecked) {
                dayDiv.classList.add('checked');
            }

            if (day === today.getDate()) {
                dayDiv.classList.add('today');
            }

            calendarGrid.appendChild(dayDiv);
        }
    };
}

function initializeSelfTest() {
    window.assessRisk = function() {
        const swelling = parseInt(document.getElementById('swelling').value);
        const numbness = parseInt(document.getElementById('numbness').value);
        const jointLimit = parseInt(document.getElementById('jointLimit').value);
        const fever = parseInt(document.getElementById('fever').value);

        const totalScore = swelling + numbness + jointLimit + fever;
        const resultDiv = document.getElementById('riskResult');

        resultDiv.className = 'risk-result';

        if (totalScore <= 3) {
            resultDiv.classList.add('low');
            resultDiv.textContent = '风险评估：低风险。请继续观察，如有变化及时就医。';
        } else if (totalScore <= 6) {
            resultDiv.classList.add('medium');
            resultDiv.textContent = '风险评估：中等风险。建议咨询医生，密切观察症状变化。';
        } else {
            resultDiv.classList.add('high');
            resultDiv.textContent = '风险评估：高风险。请立即就医，寻求专业帮助！';
        }
    };
}

function initializeQuiz() {
    const questions = [
        {
            question: '骨折愈合的四个阶段是？',
            options: ['血肿形成期、纤维软骨痂形成期、骨痂形成期、骨痂重塑期', '炎症期、增生期、重塑期、成熟期', '急性期、亚急性期、恢复期、慢性期', '早期、中期、晚期、终末期'],
            correct: 0
        },
        {
            question: '急性期康复训练的主要目标是？',
            options: ['增强肌肉力量', '消肿止痛，预防关节僵硬', '恢复关节活动度', '提高运动技能'],
            correct: 1
        },
        {
            question: '以下哪种食物富含钙质？',
            options: ['苹果', '牛奶', '米饭', '面条'],
            correct: 1
        },
        {
            question: '康复训练时出现剧烈疼痛应该？',
            options: ['继续训练', '增加训练强度', '立即停止并咨询医生', '忽略疼痛'],
            correct: 2
        },
        {
            question: '深静脉血栓的预防措施不包括？',
            options: ['早期活动', '多饮水', '长期卧床不动', '使用弹力袜'],
            correct: 2
        },
        {
            question: 'BMI的正常范围是？',
            options: ['小于18.5', '18.5-24', '24-28', '大于28'],
            correct: 1
        },
        {
            question: '骨折后多久可以开始康复训练？',
            options: ['立即开始', '1-2天后', '1个月后', '骨折愈合后'],
            correct: 1
        },
        {
            question: '以下哪种不是骨折的常见并发症？',
            options: ['骨不连', '关节僵硬', '肌肉萎缩', '高血压'],
            correct: 3
        },
        {
            question: '康复期间应该避免的食物是？',
            options: ['高蛋白食物', '高钙食物', '辛辣刺激性食物', '富含维生素的食物'],
            correct: 2
        },
        {
            question: '握力指数的正常范围是？',
            options: ['小于40%', '40-80%', '80-100%', '大于100%'],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function loadQuestion() {
        const question = questions[currentQuestion];
        document.getElementById('quizTitle').textContent = `问题 ${currentQuestion + 1}/${questions.length}`;
        document.getElementById('quizQuestion').textContent = question.question;
        
        const optionsDiv = document.getElementById('quizOptions');
        optionsDiv.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = option;
            optionDiv.onclick = function() {
                if (!answered) {
                    selectOption(index);
                }
            };
            optionsDiv.appendChild(optionDiv);
        });

        document.getElementById('nextBtn').style.display = 'none';
        answered = false;
    }

    function selectOption(index) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.classList.remove('selected'));
        options[index].classList.add('selected');

        if (index === questions[currentQuestion].correct) {
            options[index].classList.add('correct');
            score++;
        } else {
            options[index].classList.add('incorrect');
            options[questions[currentQuestion].correct].classList.add('correct');
        }

        answered = true;
        document.getElementById('nextBtn').style.display = 'block';
    }

    window.nextQuestion = function() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    };

    function showResult() {
        document.getElementById('quizCard').style.display = 'none';
        document.getElementById('quizResult').style.display = 'block';
        document.getElementById('quizScore').textContent = score;
    }

    window.restartQuiz = function() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('quizCard').style.display = 'block';
        document.getElementById('quizResult').style.display = 'none';
        loadQuestion();
    };

    loadQuestion();
}

function initializeCommunity() {
    let posts = JSON.parse(localStorage.getItem('communityPosts')) || [
        {
            author: '康复达人',
            time: '2024-01-15',
            content: '经过3个月的康复训练，我的手臂功能已经恢复了80%！坚持就是胜利！💪'
        },
        {
            author: '康复新手',
            time: '2024-01-14',
            content: '请问大家，康复训练时感到轻微疼痛正常吗？需要停止训练吗？'
        }
    ];

    function renderPosts() {
        const postsList = document.getElementById('postsList');
        postsList.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post-card';
            postDiv.innerHTML = `
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button class="btn-small">👍 点赞</button>
                    <button class="btn-small">💬 评论</button>
                </div>
            `;
            postsList.appendChild(postDiv);
        });
    }

    window.publishPost = function() {
        const content = document.getElementById('postContent').value;
        if (content) {
            const today = new Date().toISOString().split('T')[0];
            posts.unshift({
                author: '我',
                time: today,
                content: content
            });
            localStorage.setItem('communityPosts', JSON.stringify(posts));
            renderPosts();
            document.getElementById('postContent').value = '';
            alert('帖子发布成功！');
        } else {
            alert('请输入帖子内容');
        }
    };

    renderPosts();
}

function initializeAnalysis() {
    window.analyzeData = function() {
        const fileInput = document.getElementById('excelFile');
        const file = fileInput.files[0];

        if (file) {
            const resultDiv = document.getElementById('analysisResult');
            const reportContent = document.getElementById('reportContent');
            
            resultDiv.style.display = 'block';
            reportContent.innerHTML = `
                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <h4 style="color: #667eea; margin-bottom: 10px;">📊 数据概览</h4>
                    <p>文件名：${file.name}</p>
                    <p>文件大小：${(file.size / 1024).toFixed(2)} KB</p>
                    <p>分析时间：${new Date().toLocaleString()}</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <h4 style="color: #667eea; margin-bottom: 10px;">📈 分析结果</h4>
                    <p>• 数据完整性：良好</p>
                    <p>• 康复进度趋势：稳步上升</p>
                    <p>• 训练完成率：85%</p>
                    <p>• 目标达成情况：70%</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 10px;">
                    <h4 style="color: #667eea; margin-bottom: 10px;">💡 下一步建议</h4>
                    <p>1. 继续保持当前训练频率</p>
                    <p>2. 适当增加训练强度</p>
                    <p>3. 关注关节活动度改善</p>
                    <p>4. 定期复查评估效果</p>
                </div>
                <button onclick="downloadReport()" class="btn-primary" style="margin-top: 15px;">下载报告</button>
            `;
        } else {
            alert('请选择要分析的文件');
        }
    };

    window.downloadReport = function() {
        alert('分析报告已下载');
    };
}

function initializeAIChat() {
    const chatMessages = document.getElementById('aiChatMessages');
    const userInput = document.getElementById('aiUserInput');
    const sendBtn = document.getElementById('aiSendBtn');

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getRehabAdvice(userMessage) {
        const keywords = {
            '疼痛': [
                '听到您正在经历疼痛，我感到很担心。请记住，康复过程中出现轻微不适是正常的，但如果疼痛剧烈或持续不减，请务必停止训练并及时咨询医生。您的健康是最重要的，请不要勉强自己。',
                '疼痛是身体在向我们发出信号，请认真倾听它的声音。建议您记录疼痛的时间、强度和位置，这对医生诊断非常有帮助。照顾好自己，祝您早日康复！'
            ],
            '训练': [
                '训练是康复的核心，您的坚持让我非常感动！请记住循序渐进的原则，每次进步一点点，积累起来就是巨大的成就。相信自己，您已经做得很棒了！',
                '训练时请保持专注，感受每一个动作带来的变化。如果遇到困难，不要气馁，这是康复路上的正常挑战。您的努力终将得到回报！'
            ],
            '恢复': [
                '恢复是一个需要耐心的过程，每个人的节奏都不同，请不要和别人比较。专注于自己的进步，每天都比昨天更好就是胜利。您已经走在了正确的道路上！',
                '看到您在努力恢复，我由衷地为您感到高兴。请相信身体的自愈能力，配合科学的训练，您一定能够重新拥抱健康！'
            ],
            '加油': [
                '谢谢！您的鼓励让我充满动力！也请您继续加油，康复路上有我陪伴着您！每一次坚持都是在向目标靠近，您是最棒的！',
                '收到您的加油啦！让我们一起努力！您的勇气和坚持就是最好的康复良药，相信自己，胜利就在前方！'
            ],
            '多久': [
                '康复时间因人而异，取决于骨折类型、年龄和康复努力。请给自己足够的时间，不要着急。重要的是保持积极心态，一步一步稳扎稳打。',
                '骨折愈合需要时间，通常需要3-6个月甚至更久。请耐心等待，给身体足够的修复时间。您的耐心和坚持就是最好的康复方式。'
            ],
            '饮食': [
                '营养对康复至关重要！建议您多摄入高蛋白食物如鱼、肉、蛋、奶，以及富含钙质的食物。同时记得多喝水，保持营养均衡。好好照顾自己！',
                '饮食是康复的基石，请务必保证充足的蛋白质和钙质摄入。合理的营养搭配能够加速骨折愈合，让您更快恢复健康！'
            ],
            '并发症': [
                '预防并发症的关键是早期康复和定期复查。请密切关注身体的变化，如果出现异常如持续肿胀、麻木等，请及时联系医生。您的健康安全第一！',
                '我理解您对并发症的担忧，这是很正常的。只要遵循医生的指导，坚持康复训练，就能有效降低风险。请保持信心，您做得很好！'
            ],
            '心态': [
                '我知道康复过程可能会感到疲惫和沮丧，但请记住，每一次努力都在积累力量。保持积极的心态，相信自己能够战胜困难。您并不孤单！',
                '心态决定一切！请给自己多一些鼓励和肯定，您已经做得非常出色了。困难只是暂时的，光明就在前方！'
            ]
        };

        for (const [keyword, responses] of Object.entries(keywords)) {
            if (userMessage.includes(keyword)) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        const defaultResponses = [
            '您好！感谢您的信任。康复是一段需要耐心和坚持的旅程，但请相信，每一步努力都在让您离健康更近。有什么我可以帮助您的吗？',
            '看到您在积极康复，我感到非常欣慰。请记住，无论遇到什么困难，都不要放弃。您的坚持和努力一定会有回报的！',
            '康复路上，我们一起加油！请照顾好自己，注意休息，保持良好的心态。如果有任何疑问，随时可以问我。',
            '您的康复故事正在书写，每一个坚持的日子都是在创造奇迹。相信自己，您比想象中更强大！',
            '感谢您的分享！康复过程中遇到挑战是正常的，重要的是保持积极态度。我会一直在这里陪伴您、支持您！'
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    function handleSend() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            setTimeout(() => {
                const response = getRehabAdvice(message);
                addMessage(response);
            }, 1500);
            userInput.value = '';
        }
    }

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
}

function updateHeaderStats() {
    const startDate = localStorage.getItem('rehabStartDate');
    if (startDate) {
        const days = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
        document.getElementById('totalDays').textContent = days;
    } else {
        localStorage.setItem('rehabStartDate', new Date().toISOString());
        document.getElementById('totalDays').textContent = '0';
    }

    const checkins = JSON.parse(localStorage.getItem('checkins')) || [];
    document.getElementById('completedTasks').textContent = checkins.length;

    const goals = JSON.parse(localStorage.getItem('rehabGoals')) || [];
    const avgProgress = goals.length > 0 
        ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
        : 0;
    document.getElementById('progressPercent').textContent = avgProgress + '%';
}

const papersData = [
    {
        title: '上肢骨折康复训练的系统评价',
        authors: ['张明', '李华', '王芳'],
        journal: '中华骨科杂志',
        year: '2023',
        volume: '43',
        issue: '5',
        pages: '321-328',
        doi: '10.3760/cma.j.cn121113-20230115-00123',
        abstract: '目的：系统评价上肢骨折康复训练的效果。方法：检索PubMed、Embase、Cochrane Library等数据库，纳入相关随机对照试验。结果：共纳入25项研究，结果显示早期康复训练能显著改善关节活动度和肌肉功能，缩短康复时间。结论：上肢骨折后应尽早开始康复训练，以促进功能恢复。',
        keywords: ['上肢骨折', '康复训练', '系统评价', '功能恢复'],
        conclusion: '本研究表明，早期康复训练对于上肢骨折患者的功能恢复具有显著效果。建议临床实践中应重视康复训练的早期介入，制定个性化康复方案，以提高患者的生活质量。'
    },
    {
        title: '桡骨远端骨折术后康复方案研究',
        authors: ['刘强', '陈静', '赵敏'],
        journal: '中国康复医学杂志',
        year: '2023',
        volume: '38',
        issue: '3',
        pages: '245-252',
        doi: '10.3969/j.issn.1001-1242.2023.03.012',
        abstract: '目的：对比不同康复方案对桡骨远端骨折术后功能恢复的影响。方法：将120例患者随机分为两组，分别采用常规康复方案和个性化康复方案。结果：个性化康复方案组在关节活动度、握力恢复和日常生活能力方面均优于常规组。结论：个性化康复方案能获得更好的临床效果。',
        keywords: ['桡骨远端骨折', '康复方案', '个性化', '功能恢复'],
        conclusion: '个性化康复方案根据患者具体情况制定训练计划，能更有效地促进桡骨远端骨折患者的功能恢复，值得临床推广应用。'
    },
    {
        title: '肱骨髁上骨折儿童康复训练效果分析',
        authors: ['王芳', '李华', '张明'],
        journal: '中华小儿外科杂志',
        year: '2022',
        volume: '43',
        issue: '8',
        pages: '567-572',
        doi: '10.3760/cma.j.cn121134-20220715-00456',
        abstract: '目的：分析儿童肱骨髁上骨折术后康复训练的效果。方法：回顾性分析86例儿童肱骨髁上骨折患者的临床资料，所有患者均接受系统康复训练。结果：经过平均6个月的康复训练，肘关节功能优良率达92.3%。结论：早期康复训练能显著改善儿童肱骨髁上骨折术后肘关节功能。',
        keywords: ['儿童', '肱骨髁上骨折', '康复训练', '肘关节功能'],
        conclusion: '儿童肱骨髁上骨折术后早期开始系统康复训练，能有效恢复肘关节功能，减少并发症发生，提高患儿生活质量。'
    },
    {
        title: '肩关节骨折术后早期康复干预研究',
        authors: ['陈静', '刘强', '赵敏'],
        journal: '中国运动医学杂志',
        year: '2023',
        volume: '42',
        issue: '4',
        pages: '312-318',
        doi: '10.3969/j.issn.1000-8861.2023.04.008',
        abstract: '目的：探讨肩关节骨折术后早期康复干预的效果。方法：将60例患者随机分为干预组和对照组，干预组术后1周开始康复训练，对照组术后4周开始。结果：干预组在肩关节活动度、疼痛评分和生活质量方面均优于对照组。结论：早期康复干预能显著改善肩关节功能和生活质量。',
        keywords: ['肩关节骨折', '早期康复', '功能恢复', '生活质量'],
        conclusion: '肩关节骨折术后早期康复干预能有效促进功能恢复，减轻疼痛，提高患者生活质量，建议临床推广应用。'
    },
    {
        title: '肘关节骨折术后康复训练指南',
        authors: ['赵敏', '王芳', '张明'],
        journal: '中华物理医学与康复杂志',
        year: '2022',
        volume: '44',
        issue: '6',
        pages: '423-428',
        doi: '10.3760/cma.j.cn121432-20220615-00234',
        abstract: '目的：基于循证医学证据，制定肘关节骨折术后康复训练指南。方法：检索国内外相关文献，结合专家意见，制定康复训练指南。结果：指南涵盖了肘关节骨折术后不同阶段的康复训练方法、注意事项和评估标准。结论：本指南为临床康复治疗提供了科学依据。',
        keywords: ['肘关节骨折', '康复指南', '循证医学', '康复训练'],
        conclusion: '本指南基于最新循证医学证据，为肘关节骨折术后康复训练提供了详细的指导方案，有助于规范临床康复实践，提高康复效果。'
    }
];

function showPaperDetail(index) {
    const paper = papersData[index];
    const modal = document.createElement('div');
    modal.className = 'paper-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePaperModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${paper.title}</h3>
                <button class="close-btn" onclick="closePaperModal()">✕</button>
            </div>
            <div class="modal-body">
                <div class="paper-info">
                    <p><strong>作者：</strong>${paper.authors.join('、')}</p>
                    <p><strong>期刊：</strong>${paper.journal}</p>
                    <p><strong>年份：</strong>${paper.year}年 第${paper.volume}卷 第${paper.issue}期</p>
                    <p><strong>页码：</strong>第${paper.pages}页</p>
                    <p><strong>DOI：</strong>${paper.doi}</p>
                </div>
                <div class="paper-section">
                    <h4>摘要</h4>
                    <p>${paper.abstract}</p>
                </div>
                <div class="paper-section">
                    <h4>关键词</h4>
                    <div class="keywords">
                        ${paper.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
                    </div>
                </div>
                <div class="paper-section">
                    <h4>结论</h4>
                    <p>${paper.conclusion}</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closePaperModal() {
    const modal = document.querySelector('.paper-modal');
    if (modal) {
        modal.remove();
    }
}