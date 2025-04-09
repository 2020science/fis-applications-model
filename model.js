// BA in Innovation in Society - Application Model
// JavaScript for interactive functionality with refined parameters

// Global variables
let applicationCount = 75; // Starting value
let historicalData = []; // Will store historical data for charts
let suppressAnalysisUpdate = false; //ChatGPT update to fix analysis charts display bug 
let scenarios = {
    optimistic: {
        "marketing-reach": 40,
        "high-school-visits": 20,
        "digital-campaigns": 2,
        "social-media-presence": "high",
        "info-sessions": 10,
        "traditional-students": 70,
        "career-changers": 40,
        "adult-learners": 10,
        "out-of-state-recruitment":10,
        "interdisciplinary-interest": 60,
        "ethics-interest": 55,
        "social-impact-interest": 65,
        "future-focus-interest": 70,
        "career-clarity": 80,
        "unique-features": 90,
        "curriculum-flexibility": 85,
        "similar-programs": 1,
        "traditional-competition": 40,
        "market-position": 90,
        "college-going-rate": 65,
        "economic-conditions": "4",
        "demographic-trend": "stable",
        "application-visibility": "high",
        "large-program-emphasis": 30,
        "recruiter-understanding": 80,
        "program-prioritization": 75,
        "university-events": 15,
        "college-events": 12,
        "tracking-metrics": "comprehensive"
    },
    realistic: {
        "marketing-reach": 30,
        "high-school-visits": 10,
        "digital-campaigns": 2,
        "social-media-presence": "medium",
        "info-sessions": 5,
        "traditional-students": 60,
        "career-changers": 30,
        "adult-learners": 10,
        "out-of-state-recruitment":2,
        "interdisciplinary-interest": 40,
        "ethics-interest": 35,
        "social-impact-interest": 45,
        "future-focus-interest": 50,
        "career-clarity": 60,
        "unique-features": 75,
        "curriculum-flexibility": 70,
        "similar-programs": 2,
        "traditional-competition": 65,
        "market-position": 70,
        "college-going-rate": 62,
        "economic-conditions": "3",
        "demographic-trend": "slightly-declining",
        "application-visibility": "medium",
        "large-program-emphasis": 60,
        "recruiter-understanding": 50,
        "program-prioritization": 45,
        "university-events": 8,
        "college-events": 6,
        "tracking-metrics": "basic"
    },
    pessimistic: {
        "marketing-reach": 15,
        "high-school-visits": 5,
        "digital-campaigns": 1,
        "social-media-presence": "low",
        "info-sessions": 2,
        "traditional-students": 50,
        "career-changers": 20,
        "adult-learners": 5,
        "out-of-state-recruitment":0,
        "interdisciplinary-interest": 25,
        "ethics-interest": 20,
        "social-impact-interest": 30,
        "future-focus-interest": 35,
        "career-clarity": 40,
        "unique-features": 60,
        "curriculum-flexibility": 50,
        "similar-programs": 4,
        "traditional-competition": 85,
        "market-position": 50,
        "college-going-rate": 60,
        "economic-conditions": "2",
        "demographic-trend": "declining",
        "application-visibility": "low",
        "large-program-emphasis": 80,
        "recruiter-understanding": 30,
        "program-prioritization": 25,
        "university-events": 4,
        "college-events": 3,
        "tracking-metrics": "minimal"
    }
};

// Constant -- ChatGPT addition for scenario save/recall functionality

const SAVED_SCENARIOS_KEY = "savedScenarios";



// REFINED PARAMETERS - Based on evidence-based analysis of program characteristics

// Interest category weights (sum to 100)
const interestWeights = {
    interdisciplinary: 25,  // Reflects "interdisciplinary fluency" emphasis
    ethics: 25,             // Reflects "ethical reasoning" emphasis
    socialImpact: 20,       // Slightly decreased to balance with other priorities
    futureFocus: 30         // Highest weight given program's explicit emphasis on "futures literacy"
};

// Target demographic weights (sum to 100)
const demographicWeights = {
    traditional: 55,        // Slightly decreased from 60 based on research
    careerChangers: 35,     // Increased from 30 based on research showing growing interest
    adultLearners: 10       // Maintained at 10 based on current patterns
};

// Outreach approach weights (sum to 100)
const outreachWeights = {
    highSchoolVisits: 30,   // Increased based on importance for niche programs
    digitalCampaigns: 25,   // Maintained based on research
    socialMedia: 20,        // Decreased based on effectiveness for niche academic programs
    infoSessions: 25        // Based on importance for explaining unique programs
};

// Social media presence effectiveness factors
const socialMediaFactors = {
    low: 0.5,
    medium: 0.75,
    high: 1.0
};

// Competition impact factors
const competitionFactors = {
    similarPrograms: 0.6,       // Reduced to reflect potential collaboration benefits
    traditionalCompetition: 0.4  // Increased to reflect strong pull of traditional majors
};

// Demographic trend factors (annual growth rates)
const demographicFactors = {
    declining: 0.97,            // More severe decline based on enrollment cliff research
    "slightly-declining": 0.985, // More precise factor based on research
    stable: 1.0,                // No change
    "slightly-growing": 1.015,   // More precise factor based on research
    growing: 1.03               // More optimistic growth for targeted demographics
};

// Economic condition impact factors
const economicFactors = {
    "1": 0.85,  // Severe recession - innovation education may be seen as future-proofing
    "2": 0.92,  // Mild recession
    "3": 1.0,   // Stable economy
    "4": 1.05,  // Growing economy - more moderate effect
    "5": 1.1    // Booming economy - more moderate effect
};

// Internal recruitment weights
const internalRecruitmentWeights = {
    university: 0.35,  // Decreased based on research showing less emphasis on niche programs
    college: 0.65      // Increased based on research showing greater importance of college-level efforts
};

// Base scaling factor - calibrated based on historical data
const baseScalingFactor = 10;  // 2.2 based on historic enrollment. Assuming this is artificially low and based on calibration with worst case scenario increasing to 10

// Initialize the model and charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Set up event listeners for all input elements
    setupEventListeners();
    
    // Generate initial historical data
    generateHistoricalData();
    
    // Update the model with default values
    updateModel();
    
    // Add event listener for tab changes to update charts
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            // Check if the analysis tab was selected
            if (event.target.id === 'analysis-tab') {
                // Update the analysis charts
                updateSensitivityChart();
                updateSourcesChart();
            }
        });
    });
});

// Function to initialize all charts
function initializeCharts() {
    // Main applications chart
    initializeMainChart();
    
    // Program visibility chart
    initializeVisibilityChart();
    
    // Student interest chart
    initializeInterestChart();
    
    // Competition chart
    initializeCompetitionChart();
    
    // Internal recruitment chart
    initializeInternalChart();
    
    // Demographic chart
    initializeDemographicChart();
    
    // Sensitivity chart
    initializeSensitivityChart();
    
    // Applicant sources chart
    initializeSourcesChart();
}

// Function to initialize the main applications chart
function initializeMainChart() {
    const svg = d3.select("#main-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50, 300)");
    
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50, 50)");
    
    svg.append("path")
        .attr("class", "line-path")
        .attr("fill", "none")
        .attr("stroke", "#007bff")
        .attr("stroke-width", 2);
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 340)
        .text("Year");
    
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -175)
        .attr("y", 15)
        .text("Number of Applications");
}

// Function to initialize the program visibility chart
function initializeVisibilityChart() {
    const svg = d3.select("#visibility-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a radar chart
    const g = svg.append("g")
        .attr("transform", "translate(300, 175)");
    
    // Add radar chart axes
    const axes = ["High School Visits", "Digital Campaigns", "Social Media", "Info Sessions", "Overall Reach"];
    const angleSlice = Math.PI * 2 / axes.length;
    
    axes.forEach((axis, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const lineX = 150 * Math.cos(angle);
        const lineY = 150 * Math.sin(angle);
        
        g.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", lineX)
            .attr("y2", lineY)
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1);
        
        g.append("text")
            .attr("x", 160 * Math.cos(angle))
            .attr("y", 160 * Math.sin(angle))
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", "12px")
            .text(axis);
    });
    
    // Add concentric circles
    [0.2, 0.4, 0.6, 0.8, 1].forEach(r => {
        g.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", r * 150)
            .attr("fill", "none")
            .attr("stroke", "#ddd")
            .attr("stroke-width", 1);
    });
    
    // Add radar area
    g.append("path")
        .attr("class", "radar-area")
        .attr("fill", "rgba(0, 123, 255, 0.5)")
        .attr("stroke", "#007bff")
        .attr("stroke-width", 2);
}

// Function to initialize the student interest chart
function initializeInterestChart() {
    const svg = d3.select("#interest-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a pie chart
    const g = svg.append("g")
        .attr("transform", "translate(300, 175)");
    
    // Add pie chart segments
    g.append("g")
        .attr("class", "pie-segments");
    
    // Add legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(450, 100)");
    
    const interests = ["Interdisciplinary", "Ethics", "Social Impact", "Future-Focused"];
    const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545"];
    
    interests.forEach((interest, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 25)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", colors[i]);
        
        legend.append("text")
            .attr("x", 25)
            .attr("y", i * 25 + 12)
            .attr("font-size", "12px")
            .text(interest);
    });
}

// Function to initialize the competition chart
function initializeCompetitionChart() {
    const svg = d3.select("#competition-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a bar chart
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50, 300)");
    
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50, 50)");
    
    svg.append("g")
        .attr("class", "bars")
        .attr("transform", "translate(50, 50)");
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 340)
        .text("Program");
    
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -175)
        .attr("y", 15)
        .text("Distinctiveness Score");
}

// Function to initialize the internal recruitment chart
function initializeInternalChart() {
    const svg = d3.select("#internal-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a bar chart
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50, 300)");
    
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50, 50)");
    
    svg.append("g")
        .attr("class", "bars")
        .attr("transform", "translate(50, 50)");
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 340)
        .text("Recruitment Level");
    
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -175)
        .attr("y", 15)
        .text("Impact on Applications");
}

// Function to initialize the demographic chart
function initializeDemographicChart() {
    const svg = d3.select("#demographic-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a line chart
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50, 300)");
    
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50, 50)");
    
    svg.append("path")
        .attr("class", "demographic-line")
        .attr("fill", "none")
        .attr("stroke", "#dc3545")
        .attr("stroke-width", 2);
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 340)
        .text("Year");
    
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -175)
        .attr("y", 15)
        .text("Demographic Index (Base 100)");
}

// Function to initialize the sensitivity chart
function initializeSensitivityChart() {
    const svg = d3.select("#sensitivity-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a horizontal bar chart
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(50, 300)");
    
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50, 50)");
    
    svg.append("g")
        .attr("class", "sensitivity-bars")
        .attr("transform", "translate(50, 50)");
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 340)
        .text("Impact on Applications (%)");
    
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -175)
        .attr("y", 15)
        .text("Factor");
}

// Function to initialize the sources chart
function initializeSourcesChart() {
    const svg = d3.select("#sources-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Add chart elements for a pie chart
    svg.append("g")
        .attr("class", "source-segments")
        .attr("transform", "translate(300, 175)");
    
    svg.append("g")
        .attr("class", "source-labels")
        .attr("transform", "translate(300, 175)");
    
    svg.append("text")
        .attr("class", "chart-title")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 30)
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Applicant Sources");
}

// Function to generate historical data
function generateHistoricalData() {
    const currentYear = new Date().getFullYear();
    
    // Generate data for past 5 years
    historicalData = [
        { year: currentYear - 5, applications: 10 },
        { year: currentYear - 4, applications: 10 },
        { year: currentYear - 3, applications: 14 },
        { year: currentYear - 2, applications: 6 },
        { year: currentYear - 1, applications: 12 }
    ];
}

// Function to calculate interest score based on student interests
function calculateInterestScore(interdisciplinaryInterest, ethicsInterest, socialImpactInterest, futureFocusInterest) {
    // Calculate weighted average of interest categories
    const weightedScore = (
        (interdisciplinaryInterest * interestWeights.interdisciplinary) +
        (ethicsInterest * interestWeights.ethics) +
        (socialImpactInterest * interestWeights.socialImpact) +
        (futureFocusInterest * interestWeights.futureFocus)
    ) / 100;

    // Calculate balance factor to reward balanced distributions
    const interests = [interdisciplinaryInterest, ethicsInterest, socialImpactInterest, futureFocusInterest];
    const interestRange = Math.max(...interests) - Math.min(...interests);
    const balanceFactor = 1 - (interestRange / 100) * 0.3;

    const rawScore = weightedScore * balanceFactor; // still a value between 0 and 100

    // Amplify high scores non-linearly. For example, using an exponent of 1.2:
    const amplificationExponent = 1.2;
    // Normalize to a 0-1 range, apply the exponent, then return a percentage:
    const amplifiedScore = 100 * Math.pow(rawScore / 100, amplificationExponent);

    return Math.round(amplifiedScore);
}

// Function to calculate visibility score based on outreach approaches
function calculateVisibilityScore(marketingReach, highSchoolVisits, digitalCampaigns, socialMediaPresence, infoSessions) {
    // Calculate effectiveness factors as before
    const highSchoolFactor = Math.min(1, (highSchoolVisits / 50) * 1.2);
    const digitalFactor = Math.min(1, digitalCampaigns / 5);
    const socialMediaFactor = socialMediaFactors[socialMediaPresence];
    const infoSessionsFactor = Math.min(1, infoSessions / 20);

    const outreachScore = (
        (highSchoolFactor * outreachWeights.highSchoolVisits) +
        (digitalFactor * outreachWeights.digitalCampaigns) +
        (socialMediaFactor * outreachWeights.socialMedia) +
        (infoSessionsFactor * outreachWeights.infoSessions)
    );

    // Introduce a non-linear multiplier for marketing reach.
    const k = 1.2; // This constant sets how “exponential” the effect is.
    const marketingMultiplier = 1 + k * (marketingReach / 100); // Ranges from 1 (no marketing) to 2.5 (max marketing)

    // Combine the multiplier with the outreach score.
    // (Since outreachScore is still on a 0-100 scale, we apply the multiplier and then scale as needed.)
    const combinedVisibility = (marketingMultiplier * outreachScore) / 100;

    return Math.round(combinedVisibility * 100); // Final result is a number between 0 and 100
}

// Function to calculate market position and competitive pressure
function calculateMarketPosition(similarPrograms, traditionalCompetition, marketPosition) {
    // Calculate competitive pressure with non-linear function
    const similarProgramsImpact = Math.min(1, similarPrograms / 10) * competitionFactors.similarPrograms;
    const traditionalImpact = (traditionalCompetition / 100) * competitionFactors.traditionalCompetition;
    
    // Combined competitive pressure
    const competitivePressure = similarProgramsImpact + traditionalImpact;
    
    // Market position mitigates competitive pressure
    return Math.max(0, Math.min(1, competitivePressure * (1 - (marketPosition / 100) * 0.7)));
}

// Function to calculate workforce demand factor
function calculateWorkforceDemandFactor() {
    // Based on research showing growing demand for innovation skills
    return 1.05;
}

// Function to calculate program maturity factor
function calculateProgramMaturityFactor(currentYear) {
    // Program started in 2020, so calculate years since inception
    const yearsSinceInception = currentYear - 2020;
    
    // S-curve growth pattern typical for academic programs
    if (yearsSinceInception <= 3) {
        // Early phase - slow growth
        return 0.9 + (yearsSinceInception * 0.05);
    } else if (yearsSinceInception <= 8) {
        // Middle phase - accelerated growth
        return 1.05 + ((yearsSinceInception - 3) * 0.07);
    } else {
        // Mature phase - stabilization
        return 1.4;
    }
}

// Function to calculate internal recruitment factor
function calculateInternalRecruitmentFactor(
    applicationVisibility, 
    largeEmphasis, 
    recruiterUnderstanding, 
    programPrioritization,
    universityEvents,
    collegeEvents,
    trackingMetrics
) {
    // Convert string values to numeric scores
    const applicationVisibilityScore = applicationVisibility === 'high' ? 80 : (applicationVisibility === 'medium' ? 50 : 20);
    const trackingMetricsScore = trackingMetrics === 'comprehensive' ? 80 : (trackingMetrics === 'basic' ? 50 : 20);
    
    // University-level factors
    const universityFactor = (
        (applicationVisibilityScore / 100) * 0.4 +
        (1 - (largeEmphasis / 100) * 0.4) +  // Inverse relationship
        (universityEvents / 20) * 0.2
    );
    
    // College-level factors
    const collegeFactor = (
        (recruiterUnderstanding / 100) * 0.6 +
        (programPrioritization / 100) * 0.2 +
        (collegeEvents / 20) * 0.08 +
        (trackingMetricsScore / 100) * 0.02
    );
    
    // Combined internal recruitment factor
    const combinedFactor = (
        (universityFactor * internalRecruitmentWeights.university) +
        (collegeFactor * internalRecruitmentWeights.college)
    );
    
    // Scale to appropriate range (0.5 to 1.5)
    return 0.5 + combinedFactor;
}

// Function to update the model based on current input values
function updateModel() {
    // Get values from all inputs
    const marketingReach = parseInt(document.getElementById('marketing-reach').value);
    const highSchoolVisits = parseInt(document.getElementById('high-school-visits').value);
    const digitalCampaigns = parseInt(document.getElementById('digital-campaigns').value);
    const socialMediaPresence = document.getElementById('social-media-presence').value;
    const infoSessions = parseInt(document.getElementById('info-sessions').value);
    
    const traditionalStudents = parseInt(document.getElementById('traditional-students').value);
    const careerChangers = parseInt(document.getElementById('career-changers').value);
    const adultLearners = parseInt(document.getElementById('adult-learners').value);
    
    const interdisciplinaryInterest = parseInt(document.getElementById('interdisciplinary-interest').value);
    const ethicsInterest = parseInt(document.getElementById('ethics-interest').value);
    const socialImpactInterest = parseInt(document.getElementById('social-impact-interest').value);
    const futureFocusInterest = parseInt(document.getElementById('future-focus-interest').value);
    
    const careerClarity = parseInt(document.getElementById('career-clarity').value);
    const uniqueFeatures = parseInt(document.getElementById('unique-features').value);
    const curriculumFlexibility = parseInt(document.getElementById('curriculum-flexibility').value);
    
    const similarPrograms = parseInt(document.getElementById('similar-programs').value);
    const traditionalCompetition = parseInt(document.getElementById('traditional-competition').value);
    const marketPosition = parseInt(document.getElementById('market-position').value);
    
    const collegeGoingRate = parseInt(document.getElementById('college-going-rate').value);
    const economicConditions = document.getElementById('economic-conditions').value;
    const demographicTrend = document.getElementById('demographic-trend').value;
    
    // Get internal recruitment factors
    const applicationVisibility = document.getElementById('application-visibility').value;
    const largeEmphasis = parseInt(document.getElementById('large-program-emphasis').value);
    const recruiterUnderstanding = parseInt(document.getElementById('recruiter-understanding').value);
    const programPrioritization = parseInt(document.getElementById('program-prioritization').value);
    const universityEvents = parseInt(document.getElementById('university-events').value);
    const collegeEvents = parseInt(document.getElementById('college-events').value);
    const trackingMetrics = document.getElementById('tracking-metrics').value;
    
    // Current year for program maturity calculation
    const currentYear = new Date().getFullYear();
    
    // Calculate intermediate scores using refined functions
    const interestScore = calculateInterestScore(
        interdisciplinaryInterest,
        ethicsInterest,
        socialImpactInterest,
        futureFocusInterest
    );
    
    const visibilityScore = calculateVisibilityScore(
        marketingReach,
        highSchoolVisits,
        digitalCampaigns,
        socialMediaPresence,
        infoSessions
    );
    
    const valueScore = (careerClarity + uniqueFeatures + curriculumFlexibility) / 3;
    
    const competitivePressure = calculateMarketPosition(
        similarPrograms,
        traditionalCompetition,
        marketPosition
    );
    
    const internalRecruitmentFactor = calculateInternalRecruitmentFactor(
        applicationVisibility,
        largeEmphasis,
        recruiterUnderstanding,
        programPrioritization,
        universityEvents,
        collegeEvents,
        trackingMetrics
    );
    
    const demographicFactor = demographicFactors[demographicTrend];
    const economicFactor = economicFactors[economicConditions];
    const workforceDemandFactor = calculateWorkforceDemandFactor();
    const programMaturityFactor = calculateProgramMaturityFactor(currentYear);
    
    // Calculate target population with revised demographic weights
    const baseTargetPopulation = (
        (traditionalStudents * demographicWeights.traditional / 100) +
        (careerChangers * demographicWeights.careerChangers / 100) +
        (adultLearners * demographicWeights.adultLearners / 100)
    );
    
    // New: read the out of state recruitment percentage from the new slider.
    
    // Get the digital campaigns value (already defined earlier as "digitalCampaigns")
    const digitalFactor = Math.min(1, digitalCampaigns / 5);
    const outOfStateEfficiencyBase = 0.1;
    
    // With a 60% boost at maximum digital campaigns, national efficiency increases from 0.5 to 0.7.
    const outOfStateEfficiencyEffective = outOfStateEfficiencyBase * (1 + 0.6 * digitalFactor);

    // Retrieve out-of-state recruitment %
    const outofStateRecruitment = parseInt(document.getElementById('out-of-state-recruitment').value);
    const outofStateFraction = outofStateRecruitment / 100;
    // const stateFraction = 1 - outofStateFraction; placeholder as keeping at 1
    const stateFraction = 1;

    // Assume state recruitment remains at 1 efficiency.
    const stateEfficiency = 1;

    // Combine the efficiencies into an adjusted target population:
    const adjustedTargetPopulation = baseTargetPopulation * (stateFraction * stateEfficiency + outofStateFraction * outOfStateEfficiencyEffective);
    
    // Calculate base applications with revised formula
    const baseApplications = (
        adjustedTargetPopulation *
        (collegeGoingRate / 100) *
        (visibilityScore / 100) *
        (interestScore / 100) *
        (valueScore / 100) *
        baseScalingFactor
    );
    
    // Apply modifiers with non-linear relationships
    const adjustedApplications = (
        baseApplications *
        (1 - competitivePressure) *
        economicFactor *
        workforceDemandFactor *
        internalRecruitmentFactor *
        programMaturityFactor
    );
    
    // Update application count
    applicationCount = Math.round(adjustedApplications);
    
    // Update the displayed application count
    document.getElementById('application-count').textContent = applicationCount;
    
    // Update all charts
    updateCharts();
    
    // Update recommendations
    updateRecommendations(
        visibilityScore, 
        interestScore, 
        valueScore, 
        competitivePressure, 
        demographicFactor
    );
}

// Function to update all charts. Updated by ChatGPT to address analysis charts bug
function updateCharts() {
    updateMainChart();
    updateVisibilityChart();
    updateInterestChart();
    updateCompetitionChart();
    updateInternalChart();
    updateDemographicChart();

    if (!suppressAnalysisUpdate && document.getElementById('analysis').classList.contains('active')) {
        updateSensitivityChart();
        updateSourcesChart();
    }
}

// Function to update the main applications chart
function updateMainChart() {
    const svg = d3.select("#main-chart svg");
    
    // Create projection data
    const currentYear = new Date().getFullYear();
    const projectionData = [...historicalData];
    
    // Add current year's projection
    projectionData.push({ year: currentYear, applications: applicationCount });
    
    // Add future projections (5 years)
    let lastValue = applicationCount;
    const demographicTrend = document.getElementById('demographic-trend').value;
    let growthFactor = demographicFactors[demographicTrend];
    
    // Apply compounding growth factor for each future year
    for (let i = 1; i <= 5; i++) {
        // Apply compounding growth: lastValue * (growthFactor^i)
        // This ensures each year builds on the previous year's growth
        const compoundGrowth = Math.pow(growthFactor, i);
        lastValue = Math.round(applicationCount * compoundGrowth);
        projectionData.push({ year: currentYear + i, applications: lastValue });
    }
    
    // Set up scales
    const xScale = d3.scaleLinear()
        .domain([d3.min(projectionData, d => d.year), d3.max(projectionData, d => d.year)])
        .range([0, 500]);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(projectionData, d => d.applications) * 1.2])
        .range([250, 0]);
    
    // Update axes
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale);
    
    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);
    
    // Update line
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.applications))
        .curve(d3.curveMonotoneX);
    
    svg.select(".line-path")
        .datum(projectionData)
        .attr("d", line)
        .attr("transform", "translate(50, 50)");
    
    // Update points
    const points = svg.selectAll(".data-point")
        .data(projectionData);
    
    points.enter()
        .append("circle")
        .attr("class", "data-point")
        .merge(points)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.applications))
        .attr("r", d => d.year === currentYear ? 6 : 4)
        .attr("fill", d => d.year < currentYear ? "#007bff" : (d.year === currentYear ? "#28a745" : "#ffc107"))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("transform", "translate(50, 50)");
    
    points.exit().remove();
    
    // Add dividing line between historical and projected
    svg.selectAll(".divider-line").remove();
    svg.append("line")
        .attr("class", "divider-line")
        .attr("x1", xScale(currentYear) - 10)
        .attr("y1", 50)
        .attr("x2", xScale(currentYear) - 10)
        .attr("y2", 300)
        .attr("stroke", "#6c757d")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5")
        .attr("transform", "translate(50, 0)");
    
    // Add labels for historical and projected
    svg.selectAll(".section-label").remove();
    svg.append("text")
        .attr("class", "section-label")
        .attr("x", xScale(currentYear - 3))
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#007bff")
        .text("Historical Data")
        .attr("transform", "translate(50, 0)");
    
    svg.append("text")
        .attr("class", "section-label")
        .attr("x", xScale(currentYear + 3))
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#ffc107")
        .text("Projected Data")
        .attr("transform", "translate(50, 0)");
}

// Function to update the program visibility chart
function updateVisibilityChart() {
    const svg = d3.select("#visibility-chart svg");
    
    // Get values from inputs
    const marketingReach = parseInt(document.getElementById('marketing-reach').value) / 100;
    const highSchoolVisits = parseInt(document.getElementById('high-school-visits').value) / 50;
    const digitalCampaigns = parseInt(document.getElementById('digital-campaigns').value) / 5;
    const socialMediaPresence = document.getElementById('social-media-presence').value;
    const infoSessions = parseInt(document.getElementById('info-sessions').value) / 20;
    
    // Convert social media presence to a value
    const socialMediaValue = socialMediaFactors[socialMediaPresence];
    
    // Create data for radar chart
    const data = [
        highSchoolVisits,
        digitalCampaigns,
        socialMediaValue,
        infoSessions,
        marketingReach
    ];
    
    // Set up radar chart
    const axes = ["High School Visits", "Digital Campaigns", "Social Media", "Info Sessions", "Overall Reach"];
    const angleSlice = Math.PI * 2 / axes.length;
    
    // Create radar path
    let radarPath = "";
    data.forEach((d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = d * 150 * Math.cos(angle);
        const y = d * 150 * Math.sin(angle);
        
        if (i === 0) {
            radarPath += `M ${x},${y} `;
        } else {
            radarPath += `L ${x},${y} `;
        }
    });
    radarPath += "Z";
    
    // Update radar area
    svg.select(".radar-area")
        .attr("d", radarPath);
}

// Function to update the student interest chart
function updateInterestChart() {
    // Clear existing chart content
    d3.select("#interest-chart").html("");
    
    // Create new SVG
    const svg = d3.select("#interest-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Get values from inputs
    const interdisciplinaryInterest = parseInt(document.getElementById('interdisciplinary-interest').value);
    const ethicsInterest = parseInt(document.getElementById('ethics-interest').value);
    const socialImpactInterest = parseInt(document.getElementById('social-impact-interest').value);
    const futureFocusInterest = parseInt(document.getElementById('future-focus-interest').value);
    
    // Create data for pie chart
    const data = [
        { interest: "Interdisciplinary", value: interdisciplinaryInterest, weight: interestWeights.interdisciplinary },
        { interest: "Ethics", value: ethicsInterest, weight: interestWeights.ethics },
        { interest: "Social Impact", value: socialImpactInterest, weight: interestWeights.socialImpact },
        { interest: "Future-Focused", value: futureFocusInterest, weight: interestWeights.futureFocus }
    ];
    
    // Set up pie chart
    const radius = 125;
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);
    
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    // Color scale
    const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545"];
    
    // Create pie chart
    const g = svg.append("g")
        .attr("transform", "translate(250, 175)");
    
    g.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i])
        .attr("stroke", "white")
        .attr("stroke-width", 2);
    
    // Add labels
    g.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => {
            const pos = arc.centroid(d);
            pos[0] = pos[0] * 1.2;
            pos[1] = pos[1] * 1.2;
            return `translate(${pos[0]}, ${pos[1]})`;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text(d => `${d.data.interest} (${d.data.value}%)`);
    
    // Add legend
    const legend = svg.append("g")
        .attr("transform", "translate(450, 100)");
    
    data.forEach((d, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 25)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", colors[i]);
        
        legend.append("text")
            .attr("x", 25)
            .attr("y", i * 25 + 12)
            .attr("font-size", "12px")
            .text(`${d.interest} (${d.weight}%)`);
    });
}

// Function to update the competition chart
function updateCompetitionChart() {
    const svg = d3.select("#competition-chart svg");
    
    // Get values from inputs
    const similarPrograms = parseInt(document.getElementById('similar-programs').value);
    const traditionalCompetition = parseInt(document.getElementById('traditional-competition').value);
    const marketPosition = parseInt(document.getElementById('market-position').value);
    
    // Create data for bar chart
    const data = [
        { program: "BA in Innovation", value: marketPosition },
        { program: "Similar Programs", value: 100 - (similarPrograms * 10) },
        { program: "Traditional Programs", value: 100 - traditionalCompetition }
    ];
    
    // Set up scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.program))
        .range([0, 500])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([250, 0]);
    
    // Update axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);
    
    // Update bars
    const bars = svg.select(".bars").selectAll("rect")
        .data(data);
    
    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("x", d => xScale(d.program))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 250 - yScale(d.value))
        .attr("fill", (d, i) => i === 0 ? "#28a745" : (i === 1 ? "#ffc107" : "#6c757d"));
    
    bars.exit().remove();
    
    // Add labels
    const labels = svg.select(".bars").selectAll("text")
        .data(data);
    
    labels.enter()
        .append("text")
        .merge(labels)
        .attr("x", d => xScale(d.program) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.value);
    
    labels.exit().remove();
}

// Function to update the internal recruitment chart
function updateInternalChart() {
    const svg = d3.select("#internal-chart svg");
    
    // Get internal recruitment values
    const applicationVisibility = document.getElementById('application-visibility').value;
    const largeEmphasis = parseInt(document.getElementById('large-program-emphasis').value);
    const recruiterUnderstanding = parseInt(document.getElementById('recruiter-understanding').value);
    const programPrioritization = parseInt(document.getElementById('program-prioritization').value);
    const universityEvents = parseInt(document.getElementById('university-events').value);
    const collegeEvents = parseInt(document.getElementById('college-events').value);
    const trackingMetrics = document.getElementById('tracking-metrics').value;
    
    // Calculate scores
    const applicationVisibilityScore = applicationVisibility === 'high' ? 80 : (applicationVisibility === 'medium' ? 50 : 20);
    const trackingMetricsScore = trackingMetrics === 'comprehensive' ? 80 : (trackingMetrics === 'basic' ? 50 : 20);
    
    // Calculate university-level recruitment impact
    const universityRecruitmentImpact = (
        (applicationVisibilityScore * 0.4) + 
        ((100 - largeEmphasis) * 0.4) + 
        (universityEvents / 20 * 100 * 0.2)
    ) * internalRecruitmentWeights.university;
    
    // Calculate college-level recruitment impact
    const collegeRecruitmentImpact = (
        (recruiterUnderstanding * 0.4) + 
        (programPrioritization * 0.3) + 
        (collegeEvents / 20 * 100 * 0.2) + 
        (trackingMetricsScore * 0.1)
    ) * internalRecruitmentWeights.college;
    
    // Prepare data for chart
    const data = [
        { category: "University", value: universityRecruitmentImpact },
        { category: "College", value: collegeRecruitmentImpact },
        { category: "Combined", value: universityRecruitmentImpact + collegeRecruitmentImpact }
    ];
    
    // Set up scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, 500])
        .padding(0.2);
    
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([250, 0]);
    
    // Update axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);
    
    // Update bars
    const bars = svg.select(".bars").selectAll("rect")
        .data(data);
    
    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("x", d => xScale(d.category))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => 250 - yScale(d.value))
        .attr("fill", (d, i) => i === 0 ? "#007bff" : (i === 1 ? "#28a745" : "#ffc107"));
    
    bars.exit().remove();
    
    // Add labels
    const labels = svg.select(".bars").selectAll("text")
        .data(data);
    
    labels.enter()
        .append("text")
        .merge(labels)
        .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => Math.round(d.value));
    
    labels.exit().remove();
}

// Function to update the demographic chart
function updateDemographicChart() {
    const svg = d3.select("#demographic-chart svg");
    
    // Get demographic trend
    const demographicTrend = document.getElementById('demographic-trend').value;
    
    // Create data for enrollment cliff impact
    const currentYear = new Date().getFullYear();
    const data = [];
    
    // Add data points for 10 years (5 past, current, 4 future)
    for (let i = -5; i <= 4; i++) {
        const year = currentYear + i;
        let value = 100; // Base value
        
        // Apply demographic trend
        if (i >= 0) { // Current and future years
            const factor = demographicFactors[demographicTrend];
            value = 100 * Math.pow(factor, i);
        } else { // Past years
            // Slight increase in past years
            value = 100 * Math.pow(1.005, -i);
        }
        
        data.push({ year: year, value: value });
    }
    
    // Set up scales
    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
        .range([0, 500]);
    
    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.value) * 0.9, d3.max(data, d => d.value) * 1.1])
        .range([250, 0]);
    
    // Update axes
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale);
    
    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);
    
    // Update line
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);
    
    svg.select(".demographic-line")
        .datum(data)
        .attr("d", line)
        .attr("transform", "translate(50, 50)");
    
    // Add dividing line for current year
    svg.selectAll(".current-year-line").remove();
    svg.append("line")
        .attr("class", "current-year-line")
        .attr("x1", xScale(currentYear))
        .attr("y1", 50)
        .attr("x2", xScale(currentYear))
        .attr("y2", 300)
        .attr("stroke", "#6c757d")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5")
        .attr("transform", "translate(50, 0)");
    
    // Add label for enrollment cliff
    svg.selectAll(".cliff-label").remove();
    if (demographicTrend === 'declining' || demographicTrend === 'slightly-declining') {
        svg.append("text")
            .attr("class", "cliff-label")
            .attr("x", xScale(currentYear + 2))
            .attr("y", yScale(data[7].value) - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "#dc3545")
            .text("Enrollment Cliff Impact")
            .attr("transform", "translate(50, 50)");
    }
}

// Function to update the sensitivity chart
function updateSensitivityChart() {
  // Prevent recursive updates while sensitivity analysis runs
  suppressAnalysisUpdate = true;

  // Clear existing chart content
  d3.select("#sensitivity-chart").html("");

  // Define margins and total chart dimensions
  const margin = { top: 50, right: 50, bottom: 50, left: 160 };
  const totalWidth = 600;
  const totalHeight = 350;
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  // Create new SVG and an inner group ("g") translated by the margins
  const svg = d3.select("#sensitivity-chart")
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // -------------------------------
  // Sensitivity Data Calculation
  // -------------------------------
  // Save current input values
  const originalValues = {
    marketingReach: parseInt(document.getElementById('marketing-reach').value),
    interdisciplinaryInterest: parseInt(document.getElementById('interdisciplinary-interest').value),
    ethicsInterest: parseInt(document.getElementById('ethics-interest').value),
    socialImpactInterest: parseInt(document.getElementById('social-impact-interest').value),
    futureFocusInterest: parseInt(document.getElementById('future-focus-interest').value),
    traditionalCompetition: parseInt(document.getElementById('traditional-competition').value),
    collegeGoingRate: parseInt(document.getElementById('college-going-rate').value),
    recruiterUnderstanding: parseInt(document.getElementById('recruiter-understanding').value)
  };

  const originalCount = applicationCount;
  const sensitivities = [];

  // Test each factor separately by temporarily adjusting its value, updating the model, and computing impact.
  
  // Marketing Reach
  document.getElementById('marketing-reach').value = Math.min(100, originalValues.marketingReach + 20);
  updateModel();
  const marketingImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('marketing-reach').value = originalValues.marketingReach;
  sensitivities.push({ factor: "Marketing Reach", impact: marketingImpact });

  // Interdisciplinary Interest
  document.getElementById('interdisciplinary-interest').value = Math.min(100, originalValues.interdisciplinaryInterest + 20);
  updateModel();
  const interdisciplinaryImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('interdisciplinary-interest').value = originalValues.interdisciplinaryInterest;
  sensitivities.push({ factor: "Interdisciplinary", impact: interdisciplinaryImpact });

  // Ethics Interest
  document.getElementById('ethics-interest').value = Math.min(100, originalValues.ethicsInterest + 20);
  updateModel();
  const ethicsImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('ethics-interest').value = originalValues.ethicsInterest;
  sensitivities.push({ factor: "Ethics", impact: ethicsImpact });

  // Social Impact Interest
  document.getElementById('social-impact-interest').value = Math.min(100, originalValues.socialImpactInterest + 20);
  updateModel();
  const socialImpactImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('social-impact-interest').value = originalValues.socialImpactInterest;
  sensitivities.push({ factor: "Social Impact", impact: socialImpactImpact });

  // Future Focus Interest
  document.getElementById('future-focus-interest').value = Math.min(100, originalValues.futureFocusInterest + 20);
  updateModel();
  const futureFocusImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('future-focus-interest').value = originalValues.futureFocusInterest;
  sensitivities.push({ factor: "Future Focus", impact: futureFocusImpact });

  // Traditional Competition (reducing competition should boost applications)
  document.getElementById('traditional-competition').value = Math.max(0, originalValues.traditionalCompetition - 20);
  updateModel();
  const competitionImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('traditional-competition').value = originalValues.traditionalCompetition;
  sensitivities.push({ factor: "Competition", impact: competitionImpact });

  // College Going Rate
  document.getElementById('college-going-rate').value = Math.min(100, originalValues.collegeGoingRate + 10);
  updateModel();
  const collegeRateImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('college-going-rate').value = originalValues.collegeGoingRate;
  sensitivities.push({ factor: "College Rate", impact: collegeRateImpact });

  // Recruiter Understanding
  document.getElementById('recruiter-understanding').value = Math.min(100, originalValues.recruiterUnderstanding + 20);
  updateModel();
  const recruiterImpact = (applicationCount - originalCount) / originalCount * 100;
  document.getElementById('recruiter-understanding').value = originalValues.recruiterUnderstanding;
  sensitivities.push({ factor: "Recruiter Understanding", impact: recruiterImpact });

  // Restore original model state
  updateModel();

  // Sort sensitivity data in descending order of impact
  sensitivities.sort((a, b) => b.impact - a.impact);

  // -------------------------------
  // Build the Chart Using Margin Convention
  // -------------------------------
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(sensitivities, d => d.impact) * 1.1])
    .range([0, width]);

  const yScale = d3.scaleBand()
    .domain(sensitivities.map(d => d.factor))
    .range([0, height])
    .padding(0.2);

  // Append x-axis to the inner group and position it at the bottom of the drawing area
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => d + "%"));

  // Append y-axis to the inner group with adjusted font size for clarity
  g.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
    .style("font-size", "12px");

  // Create bars for the horizontal bar chart
  const bars = g.selectAll(".bar")
    .data(sensitivities);
  bars.enter()
    .append("rect")
    .merge(bars)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => yScale(d.factor))
      .attr("width", d => xScale(d.impact))
      .attr("height", yScale.bandwidth())
      .attr("fill", "#007bff");
  bars.exit().remove();

  // Append labels to the end of each bar displaying the impact value
  const barLabels = g.selectAll(".bar-label")
    .data(sensitivities);
  barLabels.enter()
    .append("text")
    .merge(barLabels)
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.impact) + 5)
      .attr("y", d => yScale(d.factor) + yScale.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .text(d => d.impact.toFixed(1) + "%");
  barLabels.exit().remove();

  // Recalculate the model with original values and re-enable analysis updates
  updateModel();
  suppressAnalysisUpdate = false;
}


// Function to update the sources chart
function updateSourcesChart() {
    // Clear existing chart content
    d3.select("#sources-chart").html("");
    
    // Create new SVG
    const svg = d3.select("#sources-chart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 350");
    
    // Get values from inputs
    const traditionalStudents = parseInt(document.getElementById('traditional-students').value);
    const careerChangers = parseInt(document.getElementById('career-changers').value);
    const adultLearners = parseInt(document.getElementById('adult-learners').value);
    
    // Calculate weighted values based on demographic weights
    const traditionalValue = traditionalStudents * demographicWeights.traditional / 100;
    const careerChangersValue = careerChangers * demographicWeights.careerChangers / 100;
    const adultLearnersValue = adultLearners * demographicWeights.adultLearners / 100;
    
    // Create data for pie chart
    const data = [
        { source: "Traditional Students", value: traditionalValue },
        { source: "Career Changers", value: careerChangersValue },
        { source: "Adult Learners", value: adultLearnersValue }
    ];
    
    // Add chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("text-anchor", "middle")
        .attr("x", 300)
        .attr("y", 30)
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Applicant Sources");
    
    // Set up pie chart
    const width = 600;
    const height = 350;
    const radius = Math.min(width, height) / 3;
    
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);
    
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    const labelArc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.6);
    
    // Color scale
    const colors = ["#007bff", "#28a745", "#ffc107"];
    
    // Create pie chart
    const g = svg.append("g")
        .attr("class", "source-segments")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    g.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i])
        .attr("stroke", "white")
        .attr("stroke-width", 2);
    
    // Add labels
    const labels = svg.append("g")
        .attr("class", "source-labels")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    labels.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text(d => {
            const percent = (d.value / (traditionalValue + careerChangersValue + adultLearnersValue) * 100).toFixed(1);
            return `${d.data.source} (${percent}%)`;
        });
    
    // Add legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width * 0.75}, ${height * 0.3})`);
    
    data.forEach((d, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 25)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", colors[i]);
        
        legend.append("text")
            .attr("x", 25)
            .attr("y", i * 25 + 12)
            .attr("font-size", "12px")
            .text(d.source);
    });
}

// Function to update recommendations based on model values
function updateRecommendations(visibilityScore, interestScore, valueScore, competitivePressure, demographicFactor) {
    const recommendationsElement = document.getElementById('recommendations');
    if (!recommendationsElement) return;
    
    let recommendations = "<h4>Key Insights</h4><ul>";
    
    // Visibility recommendations
    if (visibilityScore < 40) {
        recommendations += "<li><strong>Program Awareness:</strong> Significantly increase marketing efforts to improve visibility.</li>";
    } else if (visibilityScore < 70) {
        recommendations += "<li><strong>Program Awareness:</strong> Consider targeted marketing to specific student demographics.</li>";
    } else {
        recommendations += "<li><strong>Program Awareness:</strong> Maintain current marketing strategy with focus on quality.</li>";
    }
    
    // Interest recommendations
    if (interestScore < 40) {
        recommendations += "<li><strong>Student Interest:</strong> Emphasize program's unique value proposition in marketing materials.</li>";
    } else if (interestScore < 70) {
        recommendations += "<li><strong>Student Interest:</strong> Highlight specific program features that align with student interests.</li>";
    } else {
        recommendations += "<li><strong>Student Interest:</strong> Leverage high student interest to build program reputation.</li>";
    }
    
    // Competition recommendations
    if (competitivePressure > 0.6) {
        recommendations += "<li><strong>Competition:</strong> Differentiate program more clearly from alternatives.</li>";
    } else if (competitivePressure > 0.3) {
        recommendations += "<li><strong>Competition:</strong> Monitor competitive landscape for changes.</li>";
    } else {
        recommendations += "<li><strong>Competition:</strong> Maintain distinctive position in the market.</li>";
    }
    
    // Demographic recommendations
    if (demographicFactor < 0.98) {
        recommendations += "<li><strong>Demographics:</strong> Prepare for enrollment cliff by expanding target demographics.</li>";
    } else if (demographicFactor < 1.0) {
        recommendations += "<li><strong>Demographics:</strong> Monitor demographic trends and adjust recruitment strategy.</li>";
    } else {
        recommendations += "<li><strong>Demographics:</strong> Capitalize on favorable demographic trends.</li>";
    }
    
    recommendations += "</ul>";
    
    recommendationsElement.innerHTML = recommendations;
}

// Function to set up event listeners for all input elements
function setupEventListeners() {
    // Set up event listeners for range inputs
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        // Update value display when slider changes
        input.addEventListener('input', function() {
            const valueElement = document.getElementById(`${this.id}-value`);
            if (valueElement) {
                // Check if this is a numerical slider (not percentage)
                const isNumerical = ['high-school-visits', 'digital-campaigns', 'info-sessions', 
                                    'similar-programs', 'university-events', 'college-events'].includes(this.id);
                
                if (isNumerical) {
                    valueElement.textContent = this.value;
                } else {
                    valueElement.textContent = `${this.value}%`;
                }
            }
            
            // Update model when slider changes
            updateModel();
        });
    });
    
    // Set up event listeners for select inputs
    const selectInputs = document.querySelectorAll('select');
    selectInputs.forEach(select => {
        select.addEventListener('change', function() {
            updateModel();
        });
    });
    
    // Set up event listeners for scenario buttons
    document.getElementById('optimistic-btn').addEventListener('click', function() {
        loadScenario('optimistic');
    });
    
    document.getElementById('realistic-btn').addEventListener('click', function() {
        loadScenario('realistic');
    });
    
    document.getElementById('pessimistic-btn').addEventListener('click', function() {
        loadScenario('pessimistic');
    });
}

// Function to load a scenario
function loadScenario(scenario) {
    console.log(`Loading scenario: ${scenario}`);
    const data = scenarios[scenario];
    
    if (!data) {
        console.error(`Scenario data not found for: ${scenario}`);
        return;
    }
    
    // Update all input values
    for (const [key, value] of Object.entries(data)) {
        const element = document.getElementById(key);
        if (element) {
            console.log(`Setting ${key} to ${value}`);
            element.value = value;
            
            // Update displayed value for sliders
            if (element.type === 'range') {
                const valueElement = document.getElementById(`${element.id}-value`);
                if (valueElement) {
                    // Check if this is a numerical slider (not percentage)
                    const isNumerical = ['high-school-visits', 'digital-campaigns', 'info-sessions', 
                                        'similar-programs', 'university-events', 'college-events'].includes(element.id);
                    
                    if (isNumerical) {
                        valueElement.textContent = value;
                    } else {
                        valueElement.textContent = `${value}%`;
                    }
                }
            }
        } else {
            console.log(`Element not found: ${key}`);
        }
    }
    
    // Update the model
    updateModel();
}

// Function to save the current scenario to localStorage
function saveCurrentScenario() {
    // Ask the user to provide a name for the scenario.
    let scenarioName = prompt("Enter a name for this scenario:");
    if (!scenarioName) return;

    // List all input element IDs that you wish to save.
    const inputIds = [
        'marketing-reach',
        'high-school-visits',
        'digital-campaigns',
        'social-media-presence',
        'info-sessions',
        'traditional-students',
        'career-changers',
        'adult-learners',
        'interdisciplinary-interest',
        'ethics-interest',
        'social-impact-interest',
        'future-focus-interest',
        'career-clarity',
        'unique-features',
        'curriculum-flexibility',
        'similar-programs',
        'traditional-competition',
        'market-position',
        'college-going-rate',
        'economic-conditions',
        'demographic-trend',
        'application-visibility',
        'large-program-emphasis',
        'recruiter-understanding',
        'program-prioritization',
        'university-events',
        'college-events',
        'tracking-metrics'
    ];
    
    let scenarioData = { name: scenarioName };
    // Loop over each input and store its value.
    inputIds.forEach(id => {
        let elem = document.getElementById(id);
        if (elem) {
            scenarioData[id] = elem.value;
        }
    });
    // Also store the current application count.
    scenarioData.applicationCount = applicationCount;
    
    // Retrieve any existing scenarios from localStorage.
    let saved = localStorage.getItem(SAVED_SCENARIOS_KEY);
    let scenariosArray = saved ? JSON.parse(saved) : [];
    
    // Add the new scenario.
    scenariosArray.push(scenarioData);
    
    // Save the updated array back to localStorage.
    localStorage.setItem(SAVED_SCENARIOS_KEY, JSON.stringify(scenariosArray));
    alert("Scenario '" + scenarioName + "' saved!");
}

// Function to load a saved scenario from localStorage
function loadSavedScenario() {
    let saved = localStorage.getItem(SAVED_SCENARIOS_KEY);
    let scenariosArray = saved ? JSON.parse(saved) : [];
    if (scenariosArray.length === 0) {
        alert("No saved scenarios found.");
        return;
    }
    
    // Build a list of scenario names.
    let list = "Available Scenarios:\n";
    scenariosArray.forEach((s, i) => {
        list += (i + 1) + ". " + s.name + "\n";
    });
    let choice = prompt(list + "\nType the number of the scenario to load:");
    if (!choice) return;
    
    const index = parseInt(choice) - 1;
    if (isNaN(index) || !scenariosArray[index]) {
        alert("Invalid choice.");
        return;
    }
    
    // Retrieve the chosen scenario.
    const scenarioData = scenariosArray[index];
    
    // For each property in scenarioData (except the name and applicationCount),
    // set the corresponding input's value.
    for (let key in scenarioData) {
        if (key === "name" || key === "applicationCount") continue;
        let elem = document.getElementById(key);
        if (elem) {
            elem.value = scenarioData[key];
            // If there is an associated display element (e.g., slider value), update it.
            let disp = document.getElementById(key + "-value");
            if (disp) {
                // For range inputs that show percentage or a number.
                if (elem.type === "range") {
                    // Adjust as needed depending on which sliders are percentage values.
                    if (["high-school-visits", "digital-campaigns", "info-sessions", "similar-programs", "university-events", "college-events"].includes(key)) {
                        disp.textContent = scenarioData[key];
                    } else {
                        disp.textContent = scenarioData[key] + "%";
                    }
                } else {
                    disp.textContent = scenarioData[key];
                }
            }
        }
    }
    updateModel();
    alert("Scenario '" + scenarioData.name + "' loaded successfully!");
}

// Function to compare saved scenarios
function compareScenarios() {
    let saved = localStorage.getItem(SAVED_SCENARIOS_KEY);
    let scenariosArray = saved ? JSON.parse(saved) : [];
    if (scenariosArray.length < 2) {
        alert("Need at least two saved scenarios to compare.");
        return;
    }
    
    // For a simple comparison, list the scenario name and its application count.
    let result = "Scenario Comparison:\n\n";
    scenariosArray.forEach(s => {
        result += s.name + ": " + s.applicationCount + " projected applications\n";
    });
    alert(result);
}

// Function to clear saved scenarios -- ChatGPT addition
function clearSavedScenarios() {
  localStorage.removeItem(SAVED_SCENARIOS_KEY);
  alert("Saved scenarios have been cleared.");
}
