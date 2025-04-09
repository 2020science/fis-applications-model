# Key Model Parameters Analysis for BA in Innovation in Society

Based on a thorough review of the program documentation and research findings, I've identified the following key parameters that need refinement in the application model to better reflect the unique characteristics of the BA in Innovation in Society program.

## 1. Student Interest Factors

### Current Implementation Issues:
- The model currently weights all interest categories equally (interdisciplinary, ethics, social impact, future-focus)
- The target student demographics (traditional, career-changers, adult learners) use arbitrary weights (0.6, 0.3, 0.1)
- Interest alignment doesn't adequately reflect the program's unique value proposition

### Evidence-Based Refinements:
- **Interdisciplinary Interest**: Should be weighted higher based on program documentation emphasizing "interdisciplinary fluency" as a core competency
- **Ethics Interest**: Should be weighted higher given the program's strong focus on "ethical reasoning" and "responsible innovation"
- **Future-Focus Interest**: Should be the highest weighted factor given the program's explicit emphasis on "futures literacy" and preparing students to "shape the future"
- **Target Demographics**: Research shows growing interest from career-changers seeking to pivot toward innovation-focused roles, suggesting their weight should be increased

## 2. Program Awareness Factors

### Current Implementation Issues:
- Marketing effectiveness is calculated as a simple linear function of visibility score
- Outreach approaches (high school visits, digital campaigns, etc.) have arbitrary weights
- No specific consideration for the program's unique positioning in marketing

### Evidence-Based Refinements:
- **High School Visits**: Should target schools with strong STEM and humanities programs as identified in niche_program_dynamics.md
- **Digital Campaigns**: Should emphasize the program's unique integration of technology, ethics, and social impact
- **Information Sessions**: Should highlight the program's future-focused curriculum and ethical framework
- **Marketing Reach**: Should account for the challenge of building recognition for a new field

## 3. Competitive Landscape Factors

### Current Implementation Issues:
- Similar programs and traditional competition are treated as purely negative factors
- Market position is not tied to the program's unique characteristics
- No consideration for complementary programs that might create pathways

### Evidence-Based Refinements:
- **Similar Programs**: Should consider both competition and potential collaboration opportunities
- **Traditional Competition**: Should be weighted based on how well traditional programs address future-focused skills
- **Market Position**: Should be calculated based on the program's unique value proposition in preparing students for emerging challenges

## 4. External Environment Factors

### Current Implementation Issues:
- Demographic trends use simplistic growth factors (0.98-1.02)
- Economic conditions have arbitrary impact factors
- No consideration for changing workforce demands related to innovation

### Evidence-Based Refinements:
- **Demographic Trends**: Should incorporate the "enrollment cliff" data more precisely
- **Economic Conditions**: Should reflect how economic factors specifically affect interest in innovation-focused education
- **Workforce Demands**: Should add consideration for growing demand for graduates with skills in responsible innovation

## 5. Internal Recruitment Factors

### Current Implementation Issues:
- University and college recruitment efforts have arbitrary weights
- Limited metrics for tracking college recruitment effectiveness
- No consideration for how well recruiters understand the FIS program

### Evidence-Based Refinements:
- **University Application Process**: Should account for the challenge of students needing to select FIS BA from a long list
- **College Recruitment**: Should reflect the variable understanding/prioritization of the FIS degree by college recruiters
- **Recruiter Understanding**: Should be weighted higher given its critical importance for niche programs

## 6. Calculation Methodology

### Current Implementation Issues:
- Base scaling factor (2.5) appears arbitrary
- Linear relationships between variables oversimplify complex interactions
- No feedback loops where outcomes influence future inputs

### Evidence-Based Refinements:
- **Base Calculation**: Should be grounded in the historical data while allowing for growth potential
- **Variable Interactions**: Should incorporate non-linear relationships where appropriate
- **Program Maturity**: Should account for how the program's growth trajectory changes as it matures
