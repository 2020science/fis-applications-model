# BA in Innovation in Society - Application Model Documentation

## Overview

This documentation provides information about the interactive web-based model developed to assess factors influencing high school applications to the BA in Innovation in Society undergraduate program. The model allows users to explore how various factors affect application numbers and provides insights for optimizing recruitment strategies.

## Model Purpose

The purpose of this model is to:

1. Provide realistic projections of application numbers based on various input factors
2. Help identify which factors have the greatest impact on applications
3. Allow comparison of different scenarios (optimistic, realistic, pessimistic)
4. Generate recommendations for improving application numbers
5. Visualize relationships between different factors and application outcomes

## Key Features

### Interactive Variables

The model includes the following categories of variables that users can adjust:

#### Program Awareness Factors
- Marketing Reach (0-100%)
- High School Visits (0-50 schools)
- Digital Marketing Campaigns (0-5 campaigns)
- Social Media Presence (low/medium/high)
- Information Sessions (0-20 sessions)

#### Student Interest Factors
- Target Student Demographics (traditional-age, career-changers, adult learners)
- Interest Alignment (interdisciplinary studies, innovation ethics, social impact, future-focused education)
- Perceived Program Value (career outcomes clarity, unique program features, curriculum flexibility)

#### Competitive Landscape Factors
- Similar Programs in Region (0-10)
- Traditional Program Competition (0-100)
- Market Position (0-100)

#### External Environment Factors
- College-Going Rate (0-100%)
- Economic Conditions (1-5 scale)
- Demographic Trends (declining to growing)

### Visualizations

The model includes several visualizations to help users understand the data:

1. **Main Applications Chart**: Shows projected applications over time, including historical data and future projections with compounding growth/decline
2. **Program Visibility Chart**: Radar chart showing how different marketing approaches contribute to overall visibility
3. **Student Interest Chart**: Pie chart showing distribution of student interest across different aspects of the program
4. **Competition Chart**: Bar chart comparing the BA in Innovation in Society with competing programs
5. **Demographic Chart**: Line chart showing projected demographic trends and their impact on the applicant pool
6. **Sensitivity Chart**: Horizontal bar chart showing which factors have the greatest impact on application numbers
7. **Applicant Sources Chart**: Pie chart showing the projected breakdown of applicants by source

### Scenario Management

Users can:
- Load predefined scenarios (optimistic, realistic, pessimistic)
- Save custom scenarios
- Compare multiple scenarios side-by-side

### Additional Features

- Responsive design for desktop and mobile devices
- Print and export functionality
- Animated transitions and visual feedback
- Accessibility features for keyboard navigation
- Tooltips for additional information

## Mathematical Model

The model uses the following key formulas to calculate projected applications:

### Base Applications Formula
```
Base Applications = Target Population × College-Going Rate × Program Awareness × Interest Alignment × Demographic Weight × Value Weight / Scaling Factor
```

### Modifier Effects
```
Adjusted Applications = Base Applications × (1 + Marketing Effectiveness) × (1 - Competitive Pressure) × Economic Factor
```

### Long-term Trend Projection
```
Future Applications = Current Applications × (Demographic Factor^Year)
```

## Recent Updates

The model has been updated to address two key issues:

1. **Enhanced Student Interest Impact**: The calculation formula has been improved to make the Student Interest tab variables more impactful on the final application estimates. This includes adding demographic weight and perceived value weight factors to ensure changes in student interest variables have a noticeable effect on projections.

2. **Improved Future Projections**: The model now uses proper compounding growth for future projections, ensuring that each future year builds appropriately on previous years' growth or decline based on the selected demographic trend.

## Research Basis

The model is based on comprehensive research into:

1. The BA in Innovation in Society program's unique characteristics and value proposition
2. Factors affecting undergraduate college applications in general
3. Specific dynamics of niche and interdisciplinary programs
4. Current enrollment trends and the upcoming "enrollment cliff"
5. Competition between specialized and traditional degree programs
6. Marketing and outreach strategies for niche college programs

## Using the Model

### Basic Usage

1. Navigate through the tabs to access different categories of variables
2. Adjust sliders, dropdowns, and number inputs to change variable values
3. Observe real-time updates to the projected application numbers and visualizations
4. View the "Analysis" tab for sensitivity analysis and recommendations

### Scenario Management

1. Use the "Optimistic," "Realistic," and "Pessimistic" buttons to load predefined scenarios
2. Click "Save Current" to save your custom scenario
3. Use "Compare Scenarios" to view multiple scenarios side-by-side

### Exporting Results

1. Use the "Print Results" button to print the current model state
2. Use the "Export Data" button to download a CSV file with all current values

## Technical Implementation

The model is implemented as a client-side web application using:

- HTML5 for structure
- CSS3 for styling (with custom styles and Bootstrap framework)
- JavaScript for interactivity
- D3.js for data visualization
- Bootstrap 5 for responsive design

## Limitations and Considerations

1. The model is for exploratory purposes and should be used as one of many tools in program planning
2. Projections are based on research and reasonable assumptions but cannot account for all possible factors
3. The model does not include detailed financial considerations or resource allocation
4. External factors like policy changes or major economic shifts may affect actual outcomes

## Future Enhancements

Potential future enhancements could include:

1. Integration with actual application data for more accurate calibration
2. Additional demographic data sources for more precise projections
3. More detailed financial modeling of recruitment costs and ROI
4. Machine learning components to improve prediction accuracy over time
5. Additional visualization types for deeper insights

## Conclusion

This interactive model provides a valuable tool for understanding and optimizing the factors that influence applications to the BA in Innovation in Society program. By exploring different scenarios and understanding the relationships between various factors, stakeholders can make more informed decisions about recruitment strategies and program positioning.
