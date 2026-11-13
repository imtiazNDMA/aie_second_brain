---
title: AI Engineer Portfolio Plan
type: overview
tags: [portfolio, projects, ai-engineering, execution]
sources: []
created: 2026-07-09
updated: 2026-07-09
---

# AI Engineer Portfolio Plan

This page defines the project portfolio that will support a strong AI Engineering resume for [[Imtiaz Nabi]]. The goal is not to build generic demo notebooks. The goal is to build applied AI systems that show decision-making, evaluation discipline, deployment thinking, monitoring awareness, and technical communication.

## Portfolio thesis

The portfolio should prove five things:

1. You can frame messy real-world problems as AI systems, not just model-training tasks.
2. You can compare baselines, justify modeling choices, and evaluate tradeoffs.
3. You can design for deployment, monitoring, and iteration.
4. You can communicate technical work clearly through documentation, diagrams, and demos.
5. You can build systems relevant to AI Engineering roles, especially applied ML, LLM systems, decision support, and production AI.

## Portfolio shape

Build four flagship projects from UCI datasets. Each project should prove a different capability:

1. Predictive maintenance and operational alerting
2. Environmental forecasting and anomaly detection
3. Explainable high-stakes decision support
4. Business-facing prediction and intervention design

## Selected flagship projects

### 1. Predictive Maintenance Intelligence System

- Dataset: UCI `AI4I 2020 Predictive Maintenance Dataset`
- Positioning: Operations AI, anomaly detection, cost-sensitive alerts, monitoring-aware ML
- Resume angle: You did not build a classifier. You built a maintenance triage system.

#### Core problem

Predict equipment failure early enough to support maintenance planning while minimizing false alarms that waste engineer time.

#### System to build

- Failure prediction pipeline
- Cost-sensitive alert scoring
- Alert-priority dashboard
- Error analysis by failure type
- Monitoring design for data drift and alert quality

#### Minimum deliverables

- Clean training pipeline
- Baseline model: logistic regression or random forest
- Improved model: XGBoost, LightGBM, or CatBoost
- Class-imbalance handling strategy
- Threshold optimization using a business-style cost matrix
- Streamlit dashboard for triage view
- FastAPI inference endpoint
- Model card and monitoring plan

#### Evaluation plan

- Precision, recall, F1, ROC-AUC, PR-AUC
- Confusion matrix at multiple thresholds
- Failure-type breakdown
- Calibration plot
- Cost-based decision evaluation

#### Unique angle

Create a maintenance recommendation layer such as:

- `monitor`
- `schedule inspection`
- `urgent maintenance`

The main artifact should feel like an operations console, not a notebook.

#### Why this project matters

This project shows practical AI engineering: tabular ML, rare-event prediction, alert design, dashboarding, and monitoring thinking.

#### Phased execution plan

Use this as the exact implementation roadmap for the first flagship project.

##### Phase 0. Project setup and scope lock

Goal: define the user, scope, repo shape, and success criteria before modeling.

Todos:

- Choose repo name
- Create repo and standard folder structure
- Decide package management approach: `uv`, `pip`, or `conda`
- Create `README.md`, `requirements.txt`, `.gitignore`, and `src/`
- Write a one-paragraph problem statement
- Define the target user: maintenance engineer, operations analyst, or reliability team
- Define the prediction target and the business action categories
- Write success criteria for v1

Suggested v1 scope:

- Predict machine failure risk
- Classify each row into an action bucket
- Expose predictions in a dashboard
- Document model limits and monitoring plan

Exit criteria:

- Repo exists and runs locally
- README has problem, user, scope, and system overview
- Folder structure is finalized
- v1 success criteria are written down

##### Phase 1. Data ingestion and profiling

Goal: understand the dataset deeply enough to avoid bad assumptions.

Todos:

- Download the UCI AI4I dataset
- Save raw data under `data/raw/`
- Create a data dictionary from the dataset columns
- Inspect row count, column types, nulls, duplicates, and target balance
- Check whether failure subtypes are available and whether they create leakage risk
- Inspect feature distributions and outliers
- Create first-pass visualizations
- Write a short EDA summary in `reports/evaluation_report.md`

Questions to answer:

- How imbalanced is the target?
- Are there synthetic features or leak-prone fields?
- Which features appear most predictive?
- What kinds of failure events exist?

Deliverables:

- `notebooks/01_eda.ipynb`
- initial charts in `reports/figures/`
- documented data-quality notes

Exit criteria:

- You can explain the dataset, target, and main risks in plain language
- You have identified leakage risks and class imbalance issues
- EDA notebook and notes are saved

##### Phase 2. Baseline modeling

Goal: establish a simple, trustworthy baseline before optimizing.

Todos:

- Create train/validation/test split
- Build a preprocessing pipeline for numeric and categorical features if needed
- Train baseline model: logistic regression or random forest
- Evaluate using precision, recall, F1, ROC-AUC, and PR-AUC
- Plot confusion matrix and precision-recall curve
- Record baseline assumptions and failure modes
- Save baseline outputs and metrics

Deliverables:

- `notebooks/02_modeling.ipynb`
- baseline metric table
- saved plots for confusion matrix and PR curve

Exit criteria:

- Baseline metrics are reproducible
- You know whether the baseline is missing too many failures or over-alerting
- Baseline results are documented in the report

##### Phase 3. Improved modeling and class-imbalance strategy

Goal: produce a better predictive system and justify why it is better.

Todos:

- Train stronger models: XGBoost, LightGBM, or CatBoost
- Compare imbalance strategies: class weights, resampling, threshold tuning
- Run feature importance analysis
- Compare models on PR-AUC and recall-oriented operating points
- Tune hyperparameters lightly; avoid over-optimization
- Save best model artifact

Decision rule:

- Prefer the model that gives the best operational tradeoff, not just the highest aggregate score

Deliverables:

- comparison table across candidate models
- saved best-model artifact
- short note explaining why the chosen model won

Exit criteria:

- One model is clearly selected for v1
- The chosen model improves on the baseline in a meaningful way
- Selection rationale is documented

##### Phase 4. Threshold policy and action design

Goal: convert model scores into maintenance decisions.

Todos:

- Define the cost of false negatives vs false positives
- Create threshold scenarios for different operating points
- Map prediction ranges to action labels:
  - `monitor`
  - `schedule inspection`
  - `urgent maintenance`
- Write simple business rules around action escalation
- Evaluate how many alerts each threshold generates
- Create a threshold-selection table in the report

Key question:

- At what threshold does the system become useful to an operations team rather than noisy?

Deliverables:

- threshold comparison table
- action-mapping logic in code
- short rationale for selected threshold

Exit criteria:

- The system produces actionable categories, not just probabilities
- Selected threshold is justified by metrics and alert volume

##### Phase 5. Error analysis and reliability review

Goal: understand when the system fails and how risky those failures are.

Todos:

- Review false negatives carefully
- Review top false positives
- Break down performance by failure subtype if available
- Inspect edge cases and unusual feature combinations
- Identify where the model is overconfident
- Write a limitations section

Questions to answer:

- Which cases does the model miss?
- Are some failure types harder than others?
- What would a human need to know before trusting this system?

Deliverables:

- `notebooks/03_error_analysis.ipynb`
- error-analysis section in report
- limitations list for README and model card

Exit criteria:

- You can explain the system's main failure modes
- Limitations are written clearly and honestly

##### Phase 6. Dashboard and API

Goal: package the model as a usable AI system.

Todos:

- Build a Streamlit dashboard for machine-level review
- Show probability, action label, and top drivers
- Add filtering and sorting by risk score
- Build a FastAPI prediction endpoint
- Add example request and response payloads
- Save screenshots for portfolio use

Dashboard sections:

- Overview metrics
- High-risk machine list
- Single-record inspection view
- Threshold controls or scenario view if feasible

Deliverables:

- `src/dashboard/`
- `src/api/`
- dashboard screenshots
- working local demo

Exit criteria:

- A user can inspect predictions without opening a notebook
- API and dashboard both run locally

##### Phase 7. Monitoring and production-readiness design

Goal: show AI engineering maturity beyond training.

Todos:

- Define input-data drift checks
- Define output-score drift checks
- Define alert-volume monitoring
- Propose retraining triggers
- Write monitoring plan into model card or report
- Sketch batch vs real-time deployment choice

Monitoring examples:

- feature distribution shift
- drop in recall from reviewed outcomes
- spike in urgent alerts
- sudden drop in average confidence

Deliverables:

- monitoring section in report
- deployment note in README
- model card with operational guidance

Exit criteria:

- The project includes a credible monitoring and retraining story
- You can explain how the system would be operated after launch

##### Phase 8. Portfolio packaging and publishing

Goal: turn the work into a strong hiring artifact.

Todos:

- Clean README and add architecture diagram
- Write `reports/evaluation_report.md`
- Write `reports/model_card.md`
- Record a short demo video
- Export dashboard screenshots
- Draft 2 to 3 resume bullets from the finished project
- Publish repo when ready

Deliverables:

- polished GitHub repo
- evaluation report
- model card
- short demo
- ready-to-use resume bullets

Exit criteria:

- A recruiter or hiring manager can understand the project in under 5 minutes
- The repo looks complete and deliberate, not like an experiment dump

##### Suggested execution cadence

- Day 1: Phase 0 and Phase 1
- Day 2: Phase 2
- Day 3: Phase 3
- Day 4: Phase 4 and Phase 5
- Day 5: Phase 6
- Day 6: Phase 7 and Phase 8

##### Definition of done

The project is done only when all of these are true:

- model comparison is documented
- chosen threshold is justified
- dashboard works
- API works
- evaluation report exists
- model card exists
- README is polished
- screenshots and demo are ready

##### Immediate next step

Start with Phase 0 today. Do not open with hyperparameter tuning. First lock the repo, user story, action labels, and success criteria.

### 2. Environmental Forecasting and Sensor Anomaly Detection

- Dataset: UCI `Air Quality`
- Positioning: Forecasting, anomaly detection, public-interest AI, operations support
- Resume angle: You built a forecasting and anomaly-intelligence system for environmental monitoring.

#### Core problem

Forecast air-quality indicators and detect unusual sensor or environmental patterns early enough for operational review.

#### System to build

- Time-series forecasting pipeline
- Sensor anomaly detection layer
- Confidence interval visualization
- Error analysis across time windows and conditions
- Operational summary dashboard

#### Minimum deliverables

- Data-quality audit for missingness and corrupted sensor values
- Baseline forecast: naive or rolling average
- Improved forecast: tree-based lag features or another practical forecasting approach
- Anomaly detector for spikes, drifts, or sensor faults
- Dashboard with forecast, anomaly flags, and top drivers
- Backtesting harness
- Monitoring and retraining policy document

#### Evaluation plan

- MAE, RMSE, MAPE or sMAPE
- Rolling-window backtests
- Forecast error by period
- Anomaly case review
- Confidence interval coverage if implemented

#### Unique angle

Frame the project as a city-operations or public-sector decision-support tool. This aligns well with your NDMA background and makes the portfolio feel connected to your real-world identity.

#### Why this project matters

This project proves you can handle non-i.i.d. data, temporal validation, anomaly workflows, and public-impact framing.

### 3. Explainable Credit Risk Decision Engine

- Dataset: UCI `Statlog (German Credit Data)` or `Default of Credit Card Clients`
- Positioning: High-stakes AI, explainability, calibration, fairness, governance
- Resume angle: You built a risk decision engine with explainability and threshold policy design.

#### Core problem

Predict default or credit risk while making the system interpretable, calibrated, and decision-usable.

#### System to build

- Risk scoring model
- Probability calibration layer
- Threshold policy explorer
- SHAP-based explanation interface
- Fairness and subgroup performance review
- Governance notes and model card

#### Minimum deliverables

- Baseline model: logistic regression
- Improved model: gradient boosting model
- Calibration comparison before and after calibration
- Threshold policy scenarios such as approve, review, reject
- SHAP explanations for single cases and global patterns
- Fairness diagnostics across available subgroups
- Streamlit decision-support dashboard
- Written limitations and risk controls

#### Evaluation plan

- ROC-AUC, PR-AUC, F1
- Brier score or calibration error
- Threshold-specific business metrics
- Subgroup comparison
- False-positive and false-negative tradeoff analysis

#### Unique angle

Do not present this as a “loan default model.” Present it as a decision-support system with human review, explanation, and policy-aware thresholds.

#### Why this project matters

This project shows maturity in explainability, model governance, and stakeholder-oriented system design.

### 4. Customer Retention Intelligence Copilot

- Dataset: UCI `Telco Customer Churn`
- Positioning: Product AI, retention analytics, segmentation, action recommendation
- Resume angle: You built a retention copilot, not just a churn predictor.

#### Core problem

Predict churn risk and generate actionable retention recommendations for customer-success or operations teams.

#### System to build

- Churn prediction model
- Customer segmentation analysis
- Recommended intervention rules by segment
- Risk and retention dashboard
- Monthly monitoring and retraining concept

#### Minimum deliverables

- Baseline model: logistic regression
- Improved model: boosting model
- Segment discovery using clustering or rule-based grouping
- Feature importance and explanation layer
- Dashboard for account-level review
- Suggested interventions by risk profile
- Technical writeup explaining the intervention logic

#### Evaluation plan

- Precision, recall, F1, ROC-AUC
- Lift / top-decile risk concentration if appropriate
- Segment-level performance comparison
- Error analysis for false churn and missed churn cases

#### Unique angle

Add a business action layer such as:

- `no action`
- `offer support`
- `offer discount`
- `escalate to account manager`

This creates a product-thinking artifact instead of a pure ML artifact.

#### Why this project matters

This project shows you can connect model outputs to actual business workflows.

## Recommended build order

Build in this order:

1. Predictive Maintenance Intelligence System
2. Environmental Forecasting and Sensor Anomaly Detection
3. Explainable Credit Risk Decision Engine
4. Customer Retention Intelligence Copilot

Why this order:

- Project 1 builds strong ML-system discipline quickly.
- Project 2 adds forecasting and public-interest alignment.
- Project 3 adds explainability and governance depth.
- Project 4 adds product and business decision framing.

## Standard build template for every project

Every flagship project must contain the same evidence structure.

### A. Problem framing

- What decision is being supported?
- Who is the user?
- What is the cost of failure?
- Why is accuracy alone not enough?

### B. Baseline and improved system

- One simple baseline
- One stronger model
- Clear rationale for model selection

### C. Evaluation harness

- Train/validation/test split or temporal backtesting
- Core metrics
- Threshold analysis where relevant
- Calibration where relevant
- Error analysis

### D. Decision layer

- Translate prediction into actions
- Define user-facing categories or recommendations
- Explain threshold logic

### E. Explainability and trust

- Feature importance or SHAP
- Case-level explanation
- Known limitations
- Failure modes

### F. Deployment artifact

- GitHub repository
- README with architecture diagram
- FastAPI service or batch pipeline
- Streamlit dashboard
- Docker support if possible

### G. Monitoring design

- Data drift checks
- Output drift checks
- Performance-review cadence
- Retraining trigger policy

### H. Communication artifact

- Technical writeup
- Demo video or walkthrough
- Screenshots
- Model card

## Repository standard

Use a consistent repo structure for all projects:

```text
project-name/
  data/
    raw/
    processed/
  notebooks/
    01_eda.ipynb
    02_modeling.ipynb
    03_error_analysis.ipynb
  src/
    data/
    features/
    models/
    evaluation/
    api/
    dashboard/
  reports/
    figures/
    model_card.md
    evaluation_report.md
  tests/
  README.md
  requirements.txt
  Dockerfile
```

## Tech stack recommendation

- Language: Python
- Data: pandas, numpy
- Modeling: scikit-learn, XGBoost or LightGBM, CatBoost where useful
- Explainability: SHAP
- API: FastAPI
- UI: Streamlit
- Visualization: matplotlib, seaborn, plotly
- Experiment tracking: MLflow if manageable
- Packaging: Docker
- Testing: pytest

## What to show on the resume for each project

Every project should later produce 2 to 3 strong resume bullets using this pattern:

- Built [system], not just [model]
- Improved [metric or decision quality] through [method]
- Designed [dashboard / API / monitoring / explainability layer] for [user or workflow]

Example:

- Built a predictive-maintenance intelligence system on the UCI AI4I dataset, combining rare-event failure prediction, threshold-based alert prioritization, and a Streamlit triage dashboard for operational review.

## Quality bar

Do not stop at model training. A project only counts as portfolio-grade if it includes:

- reproducible code
- evaluation report
- decision layer
- deployment artifact
- explanation or monitoring plan
- technical writeup

## 12-week execution plan

### Weeks 1-3

- Build Project 1: Predictive Maintenance Intelligence System
- Outcome: first complete flagship project with repo, dashboard, and evaluation report

### Weeks 4-6

- Build Project 2: Environmental Forecasting and Sensor Anomaly Detection
- Outcome: second flagship project with temporal validation and operational framing

### Weeks 7-9

- Build Project 3: Explainable Credit Risk Decision Engine
- Outcome: governance-oriented project with calibration, fairness, and explainability

### Weeks 10-12

- Build Project 4: Customer Retention Intelligence Copilot
- Outcome: business-facing AI system with action recommendations and segmentation

## Detailed project workflow template

Use this workflow for each project:

1. Define the user and decision problem.
2. Download and profile the UCI dataset.
3. Establish a simple baseline.
4. Build a stronger model.
5. Perform error and subgroup analysis.
6. Design the action or decision layer.
7. Build the dashboard and API.
8. Write the evaluation report and model card.
9. Record a short demo.
10. Publish and move to the next project.

## Start today: first 6 hours

Start with Project 1.

### Hour 1

- Create the repository
- Download the AI4I dataset
- Write the project README skeleton
- Define the exact prediction target and user story

### Hour 2

- Run EDA
- Inspect class balance
- Identify leakage risks and missing-data issues
- Write initial notes in `reports/evaluation_report.md`

### Hours 3-4

- Train a baseline model
- Create first metric table
- Plot confusion matrix and PR curve
- Document baseline limitations

### Hour 5

- Train the improved model
- Compare with baseline
- Test threshold scenarios based on alert cost assumptions

### Hour 6

- Draft the dashboard wireframe
- Define the three recommendation states
- Write a short architecture section in the README

## Immediate next decisions

Before coding, lock these choices for Project 1:

1. Repo name
2. Whether you will use `uv`, `pip`, or `conda`
3. Whether the first UI will be Streamlit only or Streamlit + FastAPI
4. Whether you want MLflow in v1 or later

## Portfolio success criteria

At the end of this portfolio build, you should have:

- 4 serious flagship projects
- 4 polished GitHub repositories
- 4 technical writeups
- 4 demo-ready dashboards or apps
- enough evidence to support a strong AI Engineering resume, portfolio, and interview narrative

## Final reminder

The main differentiator is not the dataset. The differentiator is how you frame the system, evaluate tradeoffs, and present it like work that could be used by a real team.
