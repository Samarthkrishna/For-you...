// Secret Crush Revealer - Make Her Like You

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mysteryScreen = document.getElementById('mysteryScreen');
    const mainExperience = document.getElementById('mainExperience');
    const openLetterBtn = document.getElementById('openLetter');
    const steps = document.querySelectorAll('.step');
    const progressFill = document.getElementById('progressFill');
    const dots = document.querySelectorAll('.dot');
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Step navigation elements
    const revealMoreBtn = document.getElementById('revealMore');
    const seeEvidenceBtn = document.getElementById('seeEvidence');
    const finalRevealBtn = document.getElementById('finalReveal');
    const yesResponseBtn = document.getElementById('yesResponse');
    const maybeResponseBtn = document.getElementById('maybeResponse');
    const saveMemoryBtn = document.getElementById('saveMemory');
    const sendResponseBtn = document.getElementById('sendResponse');
    
    // Other elements
    const clueContent = document.getElementById('clueContent');
    const countdown = document.getElementById('countdown');
    const finalMessage = document.getElementById('finalMessage');
    const responseMessage = document.getElementById('responseMessage');
    const yourInitial = document.getElementById('yourInitial');
    const yourName = document.getElementById('yourName');
    
    // State
    let currentStep = 1;
    let userName = '';
    let userResponse = '';
    const clues = [
        "This person enjoys talking with you",
        "They notice when you're having a good day",
        "They remember little things you've mentioned",
        "They're someone you see regularly",
        "They've been thinking about this for a while",
        "They admire your authenticity"
    ];
    
    // Personalized details (CHANGE THESE!)
    const yourDetails = {
        name: "Your Name", // Change to your name
        initial: "Y", // Change to your initial
        specificMemories: [
            "That conversation we had about [specific topic]",
            "When you [specific thing she did] and it made me smile",
            "The way you [specific quality] really stood out to me"
        ],
        sharedInterests: [
            "Our shared love for [interest]",
            "How we both enjoy [activity]",
            "That time we [shared experience]"
        ]
    };
    
    // Initialize
    function init() {
        // Set personalized details
        yourInitial.textContent = yourDetails.initial;
        yourName.textContent = yourDetails.name;
        
        // Start with ambient music
        backgroundMusic.volume = 0.2;
        backgroundMusic.play().catch(e => {
            console.log("Music will play after user interaction");
        });
        
        // Add event listeners
        setupEventListeners();
        
        // Create floating effects
        createFloatingEffects();
        
        // Update progress
        updateProgress();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Open the letter
        openLetterBtn.addEventListener('click', function() {
            // Play opening sound
            playSound('open');
            
            // Animate letter opening
            this.innerHTML = '<i class="fas fa-lock"></i> Opening...';
            this.disabled = true;
            
            // Animate screen transition
            mysteryScreen.style.opacity = '0';
            
            setTimeout(() => {
                mysteryScreen.style.display = 'none';
                mainExperience.classList.remove('hidden');
                document.getElementById('step1').classList.add('active');
                
                // Animate in first step
                setTimeout(() => {
                    animateQualities();
                }, 500);
            }, 1000);
        });
        
        // Step navigation
        revealMoreBtn.addEventListener('click', () => navigateToStep(2));
        seeEvidenceBtn.addEventListener('click', () => navigateToStep(3));
        finalRevealBtn.addEventListener('click', startFinalReveal);
        
        // Response buttons
        yesResponseBtn.addEventListener('click', () => handleResponse('yes'));
        maybeResponseBtn.addEventListener('click', () => handleResponse('maybe'));
        
        // Final actions
        saveMemoryBtn.addEventListener('click', saveMemory);
        sendResponseBtn.addEventListener('click', sendResponse);
        
        // Music toggle
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                this.innerHTML = '<i class="fas fa-music"></i><span>Ambient Music</span>';
            } else {
                backgroundMusic.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i><span>Play Music</span>';
            }
        });
        
        // Progress dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const step = parseInt(this.dataset.step);
                if (step <= currentStep) {
                    navigateToStep(step);
                }
            });
        });
        
        // Quality hover effects
        document.querySelectorAll('.quality').forEach(quality => {
            quality.addEventListener('mouseenter', function() {
                const type = this.dataset.quality;
                createSparkleEffect(this);
            });
        });
        
        // Option selection
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const selected = this.dataset.option;
                document.querySelectorAll('.option').forEach(opt => {
                    opt.style.background = 'rgba(255, 255, 255, 0.1)';
                    opt.style.border = '1px solid transparent';
                });
                
                this.style.background = 'rgba(255, 64, 129, 0.2)';
                this.style.border = '1px solid #ff4081';
                
                // Store selection
                userResponse = selected;
            });
        });
    }
    
    // Navigate to step
    function navigateToStep(stepNumber) {
        // Play navigation sound
        playSound('navigate');
        
        // Hide current step
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            step.classList.add('hidden');
        });
        
        // Show new step
        const newStep = document.getElementById(`step${stepNumber}`);
        newStep.classList.remove('hidden');
        
        // Update current step
        currentStep = stepNumber;
        
        // Special actions for each step
        switch(stepNumber) {
            case 2:
                animateConnectionPoints();
                break;
            case 3:
                showEvidence();
                break;
        }
        
        // Animate in after a delay
        setTimeout(() => {
            newStep.classList.add('active');
        }, 50);
        
        // Update progress
        updateProgress();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update progress bar and dots
    function updateProgress() {
        const progress = ((currentStep - 1) / 4) * 100;
        progressFill.style.width = `${progress}%`;
        
        dots.forEach((dot, index) => {
            if (index + 1 <= currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Animate qualities in step 1
    function animateQualities() {
        const qualities = document.querySelectorAll('.quality');
        qualities.forEach((quality, index) => {
            setTimeout(() => {
                quality.style.opacity = '1';
                quality.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    // Animate connection points in step 2
    function animateConnectionPoints() {
        const points = document.querySelectorAll('.point');
        points.forEach((point, index) => {
            setTimeout(() => {
                point.classList.add('visible');
            }, index * 300);
        });
    }
    
    // Show evidence in step 3
    function showEvidence() {
        // Animate evidence cards
        const cards = document.querySelectorAll('.evidence-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Show clues one by one
        showClues();
    }
    
    // Show clues one by one
    function showClues() {
        clueContent.innerHTML = '';
        let clueIndex = 0;
        
        const clueInterval = setInterval(() => {
            if (clueIndex < clues.length) {
                const clue = document.createElement('div');
                clue.className = 'clue-item';
                clue.textContent = clues[clueIndex];
                clue.style.animation = 'fadeIn 0.5s ease';
                
                clueContent.appendChild(clue);
                
                // Clear after 2 seconds
                setTimeout(() => {
                    if (clueIndex < clues.length - 1) {
                        clue.style.opacity = '0';
                        setTimeout(() => clue.remove(), 500);
                    }
                }, 2000);
                
                clueIndex++;
            } else {
                clearInterval(clueInterval);
                
                // Show final personalized clue
                setTimeout(() => {
                    const finalClue = document.createElement('div');
                    finalClue.className = 'final-clue';
                    finalClue.innerHTML = `
                        <strong>The biggest clue:</strong><br>
                        It's someone who genuinely enjoys ${yourDetails.sharedInterests[0].toLowerCase()}
                    `;
                    finalClue.style.animation = 'fadeIn 1s ease';
                    clueContent.appendChild(finalClue);
                }, 500);
            }
        }, 2500);
    }
    
    // Start final reveal with countdown
    function startFinalReveal() {
        playSound('countdown');
        
        let count = 3;
        countdown.classList.remove('hidden');
        finalMessage.classList.add('hidden');
        
        const countdownInterval = setInterval(() => {
            if (count > 0) {
                document.querySelector('.countdown-number').textContent = count;
                createCountdownEffect();
                count--;
            } else {
                clearInterval(countdownInterval);
                document.querySelector('.countdown-number').textContent = '!';
                
                setTimeout(() => {
                    countdown.classList.add('hidden');
                    finalMessage.classList.remove('hidden');
                    playSound('reveal');
                    createRevealEffects();
                }, 1000);
            }
        }, 1000);
    }
    
    // Handle response
    function handleResponse(responseType) {
        playSound(responseType === 'yes' ? 'celebration' : 'neutral');
        
        userResponse = responseType;
        
        // Create response effect
        if (responseType === 'yes') {
            createYesEffects();
        }
        
        // Navigate to celebration step
        setTimeout(() => {
            navigateToStep(5);
            showResponseMessage(responseType);
        }, 1500);
    }
    
    // Show response message
    function showResponseMessage(responseType) {
        let message = '';
        
        switch(responseType) {
            case 'yes':
                message = `
                    <h3>That makes me incredibly happy! 😊</h3>
                    <p>I've been wanting to tell you how I feel for a while now.</p>
                    <p>Your willingness to give this a chance means more than you know.</p>
                    <p>I promise to make sure you never regret saying yes.</p>
                `;
                break;
            case 'maybe':
                message = `
                    <h3>I completely understand 🙏</h3>
                    <p>It's okay to need time to think about it.</p>
                    <p>I appreciate your honesty and openness.</p>
                    <p>No matter what you decide, I value our connection.</p>
                `;
                break;
        }
        
        responseMessage.innerHTML = message;
    }
    
    // Save memory
    function saveMemory() {
        playSound('save');
        
        // Create a "memory saved" effect
        const savedMessage = document.createElement('div');
        savedMessage.className = 'saved-notification';
        savedMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>This moment has been saved in our memories</span>
        `;
        savedMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: fadeInOut 3s ease;
        `;
        
        document.body.appendChild(savedMessage);
        
        setTimeout(() => {
            savedMessage.remove();
        }, 3000);
    }
    
    // Send response
    function sendResponse() {
        // In a real implementation, this would send an email or notification
        const responseBox = document.createElement('div');
        responseBox.className = 'response-box';
        responseBox.innerHTML = `
            <h3>Share Your Thoughts</h3>
            <textarea placeholder="What's on your mind?" rows="4"></textarea>
            <div class="response-actions">
                <button class="send-btn">Send Anonymously</button>
                <button class="send-btn">Include My Name</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;
        
        // Style and add to page
        responseBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 500px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(responseBox);
        
        // Add event listeners for buttons
        responseBox.querySelectorAll('.send-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Message sent! (This is a demo - in real life, I\'d get your message)');
                responseBox.remove();
            });
        });
        
        responseBox.querySelector('.cancel-btn').addEventListener('click', function() {
            responseBox.remove();
        });
    }
    
    // Create floating effects
    function createFloatingEffects() {
        const effectsContainer = document.getElementById('effectsContainer');
        
        setInterval(() => {
            const effect = document.createElement('div');
            effect.className = 'floating-effect';
            effect.innerHTML = '✨';
            effect.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: ${Math.random() * 20 + 10}px;
                opacity: 0.3;
                pointer-events: none;
                animation: floatUp ${Math.random() * 10 + 10}s linear forwards;
                z-index: -1;
            `;
            
            effectsContainer.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 20000);
        }, 3000);
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create sparkle effect
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✦';
                sparkle.style.cssText = `
                    position: absolute;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    font-size: 15px;
                    color: #ff79a9;
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparklePop 0.5s ease-out forwards;
                `;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 500);
            }, i * 100);
        }
        
        // Add sparkle animation
        if (!document.getElementById('sparkleAnimation')) {
            const style = document.createElement('style');
            style.id = 'sparkleAnimation';
            style.textContent = `
                @keyframes sparklePop {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2) rotate(180deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Create countdown effect
    function createCountdownEffect() {
        const effectsContainer = document.getElementById('effectsContainer');
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '•';
            particle.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                color: #ff4081;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: countdownParticle ${Math.random() * 0.5 + 0.5}s ease-out forwards;
            `;
            
            effectsContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    // Create reveal effects
    function createRevealEffects() {
        // Heart explosion
        for (let i = 0; i < 50; i++) {
            setTimeou
