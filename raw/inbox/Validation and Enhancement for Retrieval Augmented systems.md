## Page 1

VERA: Validation and Enhancement for Retrieval Augmented systems
NitinAravindBirur,TanayBaswa,DivyanshuKumar,JatanLoya,SahilAgarwal,Prashanth
Harshangi
EnkryptAI,Boston,MA,USA
{nitin,tanay,divyanshu,jatan,sahil,prashanth}@enkryptai.com
Abstract
Largelanguagemodels(LLMs)exhibitremarkablecapabili-
tiesbutoftenproduceinaccurateresponses,astheyrelysolely
on their embedded knowledge. Retrieval-Augmented Gen-
eration (RAG) enhances LLMs by incorporating an exter-
nal information retrieval system, supplying additional con-
textalongwiththequerytomitigateinaccuraciesforapar-
ticularcontext.However,accuracyissuesstillremain,asthe
model may rely on irrelevant documents or extrapolate in-
correctlyfromitstrainingknowledge.Toassessandimprove
the performance of both the retrieval system and the LLM
Figure1:AnoverviewofVERA
in a RAG framework, we propose VERA (Validation and
Enhancement for Retrieval Augmented systems), a system
designed to: 1) Evaluate and enhance the retrieved context
before response generation, and 2) Evaluate and refine the the documents (Longpre et al. 2021). The quality of the
LLM-generated response to ensure precision and minimize LLM’s response can also be compromised by erroneous or
errors.VERAemploysanevaluator-cum-enhancerLLMthat irrelevantretrievals(Khandelwaletal.2019).Inreality,re-
firstchecksifexternalretrievalisnecessary,evaluatestherel- trievals are not always necessary and are primarily needed
evance and redundancy of the retrieved context, and refines
for knowledge-intensive tasks. Therefore, there is a critical
ittoeliminatenon-essentialinformation.Post-responsegen-
needtoenhanceboththequalityofretrievalsandthequality
eration, VERA splits the response into atomic statements,
ofresponses.
assesses their relevance to the query, and ensures adher-
ence to the context. Our experiments demonstrate VERA’s To quantify and evaluate the quality of retrievals and re-
remarkable efficacy not only in improving the performance sponses,weemploythefollowingmetrics:
of smaller open-source models, but also larger state-of-the • Response Adherence: This metric measures the extent
artmodels.TheseenhancementsunderscoreVERA’spoten-
towhichtheLLM’sresponseisgroundedintheprovided
tial to produce accurate and relevant responses, advancing
context.
the state-of-the-art in retrieval-augmented language model-
ing. VERA’s robust methodology, combining multiple eval- • ResponseRelevance:Thismetricevaluatestheamount
uation and refinement steps, effectively mitigates hallucina- ofinformationintheLLM’sresponsethatisrelevantto
tionsandimprovesretrievalandresponseprocesses,making andhelpsinansweringthegivenquery.
it a valuable tool for applications demanding high accuracy
• ContextRelevance:Thismetricassessestheamountof
andreliabilityininformationgeneration.
information in the retrieved context that is pertinent to
andaidsinansweringthegivenquery.
Introduction
These metrics allow for a comprehensive evaluation of
Retrieval-AugmentedGeneration(RAG)(Lewisetal.2020)
boththeretrievalprocessandthesubsequentresponsegen-
techniques enhance the inputs to Large Language Models
eration, ensuring improvements in the overall performance
(LLMs) by incorporating relevant retrieved passages, thus
ofRAGsystems.
reducingfactualerrorsinknowledge-intensivetasks.These
VERA enhances the Context Relevance of retrieved
passages are retrieved using methods such as vector simi-
sources prior to their input into the LLM and subsequently
laritysearch.However,previousresearchhasdemonstrated
improves the Response Adherence and Relevance after the
that retrieval-augmented models may generate text that in-
LLM generates its response. To achieve this, VERA em-
cludes additional information beyond the retrieved docu-
ploys an evaluator-cum-enhancer LLM that assesses the
ments (Dziri et al. 2022), disregards the documents alto-
content, utilizing reasoning to determine optimal edits,
gether (Krishna, Roy, and Iyyer 2021), or even contradicts
whicharethenexecutedwhilepreservingtheoriginalstruc-
Preprint.Underreview. tureandstyleofboththecontextandtheresponseasmuch
4202
peS
81
]LC.sc[
1v46351.9042:viXra

## Page 2

aspossible. CRAG
InourefforttoenhancetheperformanceofRAGsystems
TheCorrectiveRAG(CRAG)paper(Yanetal.2024)intro-
withanyarbitraryretrievalsystemandLLM,wecontribute
duces a method to enhance the accuracy of language mod-
thefollowingadvancements:
els by reintegrating information from retrieved documents.
1. RobustandFine-GrainedEvaluationTechnique: We It employs an evaluator to assess the quality of the doc-
introduce a comprehensive evaluation method to assess uments obtained for a query and then determines whether
anygivenretrievalsystemandLLMusingthepreviously to use, ignore, or request additional data from these docu-
mentionedmetrics. ments.CRAGalsoutilizeswebsearchestoexpanditsinfor-
2. SystemforContextandResponseEnhancement:We mationbeyondstaticdatabases,ensuringaccesstoabroader,
propose a system that leverages the fine-grained eval- up-to-date range of information. Additionally, it employs a
uation results to analyze and perform appropriate edits uniquestrategytodecomposeandreconstructretrieveddoc-
to the context (before response generation) and the re- uments,emphasizingtheextractionofthemostrelevantin-
sponse. The ultimate goal is to produce error-free, rele- formation while eliminating distractions. Although CRAG
vantresponsesusingaRAGsystem. improvesthequalityofretrieval,itdoesnotaddressinaccu-
Moreover,ourmethodisdesignedtobeeasilyreproducible, raciesandirrelevanciesinthefinalresponse.WhileCRAG’s
allowingseamlessintegrationintoanyexistingRAGsystem. ability to access the web for external information may be
usefulforgeneral-purposequestionanswering,mostcritical
RelatedWorks applicationsofRAGsystemsaimtolimittheLLM’sscope
ofknowledgetotheprovideddocuments(e.g.,customerser-
RARR
vicebots).
The RARR (Gao et al. 2023) framework retroactively en-
ables large language models (LLMs) to attribute external FACTScore
evidence through a process termed Editing for Attribution.
Given a model-generated text, RARR conducts a research FACTSCORE(Minetal.2023)introducesamethodtoeval-
stage to locate evidence supporting the text’s statements. uate the factual accuracy of language models by decom-
Subsequently, in the revision stage, the framework utilizes posing their outputs into atomic facts and verifying each
this gathered evidence to amend any facts in the original one against a specified knowledge source. It also presents
text that lack support, while striving to preserve the initial amodelthatapproximatesFACTSCOREwithanerrorrate
content as much as possible. RARR primarily aims to cor- of less than 2%, enabling the evaluation of a large set of
rectandattributemodel-generatedtextswithinopendomain new LMs without requiring manual human effort. VERA
scenarios that lack supporting context in the input prompt. employsasimilartechniquetoassessthecontextadherence
Although this approach can be applied to closed-domain of responses. However, FACTSCORE is purely an evalua-
retrieval-augmentedgeneration(RAG)pipelines,itdoesnot tion technique for testing adherence quality and does not
enhancetherelevanceofthecontextoranswers. address the quality enhancement of context retrieval or the
responses.
SELF-RAG
The Self-RAG framework, as introduced by (Asai et al. Methodology
2023),representsapioneeringapproachinnaturallanguage
WepresentVERA,afine-grainedevaluatorandenhancerfor
generation(NLG)byintegratingself-reflectionmechanisms
retrievers and LLMs within a RAG system. As depicted in
intothetrainingandgenerationprocessofalanguagemodel
theaccompanyingfigure,VERAfirstevaluatesandeditsthe
(LM).Thisend-to-endtrainedLMgeneratesoutputinseg-
retrievedcontexttoincreaseitsrelevanceandconcisenessin
mented form, guided by specialized reflection tokens de-
relationtothequery.Thisrefinedcontextisthenprovidedto
signedtoenhanceitsperformance.Keyamongthesetokens
theLLMforresponsegeneration.Aftertheresponseisgen-
is the Retrieve token, which determines whether the model
erated,itundergoesfurtherevaluationandeditingtoensure
shouldretrievemultipledocumentsinparalleltoinformits
itisconciseanderror-free,resultinginthefinalresponse.
generationprocess.Ifretrievalisactivated(Retrieve==yes),
All components of VERA are implemented using few-
themodelevaluatestherelevanceofretrieveddocumentsus-
shotprompting.Inallourexperiments,weemployGPT-4o
ing the IsRel token. This token categorizes relevance as ei-
astheevaluator-cum-enhancermodelduetoitsstate-of-the-
ther ”relevant” or ”irrelevant,” thereby assisting the model
artcapabilities.
in selecting pertinent information. Subsequently, the IsSup
token assesses the degree to which the generated output is
RetrievalRequirementcheck
supported by the retrieved documents, while the IsUse to-
ken judges the usefulness of the generated text on a prede- Not all queries necessitate retrieval; only those that are
finedscale.Byiterativelyapplyingthesetokens,Self-RAG knowledge-intensive do. Upon receiving a user prompt,
aimstoimprovethequality,relevance,andutilityofitsgen- VERA determines whether external context is required to
erated outputs through self-critique and refinement. How- answerthepromptorifitcanbeaddressedusingthemodel’s
ever, SELF-RAG is not very flexible or versatile as train- internal knowledge. If retrieval is necessary, VERA pro-
ing a language model is both resource-intensive and time- ceedstoretrievetherequiredcontext.Otherwise,theprompt
consuming. ispasseddirectlytotheLLMforresponsegeneration.

## Page 3

Figure3:RetrievalRequirementCheck
Algorithm1:RetrievalRequirementCheck
Input:UserqueryQ
Output:Booleanindicatingifretrievalisneeded
1: functionNEEDSRETRIEVAL(Q)
2: ifQisknowledge-intensivethen
3: returnTrue
4: else
5: returnFalse
6: endif
7: endfunction
ResponseRelevancyEvaluationandCorrection
Toensurethatthegeneratedresponsecontainsonlyinforma-
tion pertinent to answering the query, VERA evaluates and
editstheresponsetoeliminateanysuperfluousdetails.This
process involves splitting the response into atomic state-
ments and assessing the relevance of each statement in ad-
dressingthequeryusingreasoning.Irrelevantatomicstate-
Figure2:AnoverviewofmethodologyofVERA mentsareremovedfromtheoriginalresponsewhileensur-
ingthattheremainingcontentispreserved.Thismeticulous
approach guarantees that the final response is concise and
RetrievalQualityEvaluationandCorrection focused,devoidofanyunnecessaryinformation,therebyen-
hancingtheoverallqualityandaccuracyoftheanswerpro-
After the retriever system retrieves the necessary context,
vided.
VERAevaluatesitsrelevance.VERAtheneditsthecontext
LetS = {s ,s ,...,s }bethesetofatomicstatements
toeliminateanyredundantinformationthatwouldnotaidin 1 2 n
intheresponse.Eachstatements isassignedabinaryscore
answering the query without changing any other details or i
r(s ), where r(s ) = 1 if the statement is relevant and
style. i i
r(s )=0ifitisnot.
LetCbetheoriginalcontextretrievedbytheretrieversys- i
temandC′betheeditedcontextafterVERAhaseliminated
redundantinformation.
Algorithm2:RetrievalQualityEvaluationandCorrection
TheretrievalrelevancescoreR isgivenbytheratio
retrieval Input:RetrievedcontextC
of the length of the edited context |C′| to the length of the
Output:EditedcontextC′
originalcontext|C|:
1: functionEVALUATEANDEDITCONTEXT(C)
|C′| 2: C′ ←EliminateRedundantInformation(C)
R retrieval = |C| 3: R retrieval ← | | C C ′ | |
If R = 0 (i.e., |C′| = 0), it indicates that the re- 4: if|C′|=0then
retrieval 5: returnQuerycannotbeansweredwithretrieved
trieved context fails to provide any useful information, and
context
the process is halted. The user is then informed that their
6: else
querycannotbeanswered.IfR > 0,itindicatesthat
retrieval 7: returnC′
thereissufficientinformationinthecontext,andthisedited
context C′ is used to generate the LLM’s response to the 8: endif
9: endfunction
userquery.

## Page 4

Figure5:ResponseRelevancyEvaluationandCorrection
Figure4:RetrievalQualityEvaluationandCorrection
Algorithm 4: Response Adherence Evaluation and Correc-
Algorithm 3: Response Relevancy Evaluation and Correc- tion
tion Input:EditedresponseR,EditedcontextC′
Input:GeneratedresponseR,UserqueryQ Output:FinalresponseR′
Output:EditedresponseR′
1: function EVALUATEANDEDITRESPONSEADHER-
1: function EVALUATEANDEDITRESPONSERELE- ENCE(R,C′)
VANCY(R,Q)
2: S ←SplitIntoAtomicStatements(R)
2: S ←SplitIntoAtomicStatements(R) 3: S′ ←∅
3: S′ ←∅ 4: foralls i ∈S do
4: foralls i ∈S do 5: ifIsGroundedInContext(s i ,C′)then
5 6 : : ifIs S R ′ el ← eva S n ′ t( ∪ s i { , s Q i } )then 6 7 : : end S if ′ ←S′∪{s i }
7: endif 8: endfor
8 9 : : e R n re d sp f o o n r se ← |S 1 | (cid:80)| i S = | 1 r(s i ) 1 9 0 : : r A e r t e u sp r o n nse Jo ← inS |S t 1 a | t (cid:80) em | i e S = n | 1 ts g ( ( S s ’ i ) )
10: returnJoinStatements(S’) 11: endfunction
11: endfunction
ThefinalresponserelevancescoreR isgivenby: and then assessing each of them. However, this approach
response
of using a binary score to classify each statement as ad-
1 (cid:88) n herent or non-adherent yielded sub-optimal evaluation ac-
R response = n r(s i ) curacy, as some statements, while not explicitly present in
i=1 thecontext,couldbelogicallyinferredandshouldtherefore
where n is the total number of atomic statements in the beclassifiedasadherent.Toimproveaccuracy,wepropose
response. This score reflects the proportion of the original amorenuancedclassificationsystemforatomicstatements,
responsethatisrelevanttothequery. prompting the evaluator to categorize them into three dis-
tinctclasses:(1)directlyderivablefromthecontext,(2)not
ResponseAdherenceEvaluationandCorrection directly derivable but logically inferable from the context,
As discussed earlier, LLMs in RAG system may gener- and(3)entirelyinaccurateandnotgroundedinthecontext.
ate text that includes additional information beyond the re- This classification process is guided by chain-of-thought
trieveddocuments(Shusteretal.2021),disregardsthedoc- reasoning (Wei et al. 2022) to maximize precision. VERA
uments altogether, or even contradicts the documents. This then uses reasoning to make necessary edits by correcting
wasobservedbyuseveninstate-of-the-artLLMslikeGPT- anyincorrectstatementsandremovingstatementswhichare
4o.VERAaddressesthisbysplittingtheresponsefromthe notgroundedinthecontext.
previous step (relevancy correction) into atomic statements The response adherence score is calculated by assigning
similar to what is proposed in FactScore (Min et al. 2023) a binary score to each atomic statement. If a statement is

## Page 5

questions, this dataset was adversarially crowd-sourced to
challenge systems in a variety of tasks. To successfully
navigate DROP, a system must interpret references within
a question—potentially across multiple parts of the in-
put—and carry out discrete operations such as addition,
counting,orsorting.Thesetasksdemandathoroughunder-
standingoftheparagraph’scontent.
RealWorldDownstreamTasks Toevaluatetheeffective-
ness of VERA on real-world downstream tasks, we com-
piledasetofthreedocumentsrepresentingdiverseusecases
ofaRAGbasedLLM.Thesedocumentsinclude:
1. World War II Wikipedia Page: The Wikipedia article
onWorldWarIIpresentsachallengingevaluation,test-
ingthemodel’scapacitytoadheretotheprovidedcontext
withoutdeviatingduetoitspre-existingknowledgefrom
priortraining.
2. Apple10-KReport:The2023fiscalyearForm10-Kfor
ApplewaschosentoassesstheRAGsystem’sabilityto
handle numerical and financial data (Setty et al. 2024),
reflectingacommonapplicationofRAGmodelsinpro-
cessingandinterpretingfinancialdocuments.
Figure6:ResponseAdherenceEvaluationandCorrection
Baselines
groundedinthecontextordeduciblefromthecontext,itis We assess publicly available pre-trained language models
assignedascoreof1;otherwise,itreceivesascoreof0.The such as Mistral-7B-instruct-v0.1 (Jiang et al. 2023), GPT-
finalresponseadherencescoreA response isgivenby: 3.5-turbo (Brown 2020), and GPT-4o (OpenAI et al. 2024)
todemonstrateVERA’seffectivenessacrossdifferentmodel
n
1 (cid:88) sizes. Mistral-7B-instruct-v0.1 represents a smaller model,
A = g(s )
response n i while GPT-4o exemplifies a state-of-the-art model. Addi-
i=1 tionally,wecomparethesewiththe7BSelf-Rag(Asaietal.
where S = {s 1 ,s 2 ,...,s n } is the set of atomic state- 2023) (Touvron et al. 2023) model available on Hugging-
ments in the response, g(s i ) is the binary score for each Face.
statements i (1ifgroundedandaccurate,0otherwise),and For downstream tasks, we utilize FAISS (Douze et al.
n is the total number of atomic statements in the response. 2024) as a vector store and use similarity search retrieval,
Thisscorereflectstheproportionoftheinitialresponsethat settingthechunksizeto512tokensandchunkoverlapto25
isaccurateandadherenttothecontext. tokens.Toensureconsistency,GPT-4oisusedastheevalu-
atormodelforVERAinalltests.Theanswersgeneratedby
Experiments VERA are further evaluated using GPT-4o to obtain post-
TasksandDatasets enhancement scores. The questions to create a QA dataset
from the given documents were created using the ragas li-
We rigorously assess VERA’s effectiveness across various
brary (Es et al. 2023). There was an equal proportion of
datasetsanddownstreamtasks(Kucharavy2024).Ourtests
questions testing reasoning abilities and questions that re-
aredesignedtoestablishafairbaselineandaccuratelyreflect
quiredmultiplecontextstoanswer.
real-worldscenarios.
TheSQuAD-2.0andDROPdatasetsdonotrequireare-
SQuAD-2.0 Dataset Stanford Question Answering triever system, as they provide the context directly within
Dataset (SQuAD) (Rajpurkar et al. 2016) is a reading thedatasetitself.
comprehension dataset, consisting of questions posed by
crowdworkers on a set of Wikipedia articles, where the Results
answertoeveryquestionisasegmentoftext,orspan,from
Weobservedasubstantialimprovementinaccuracyforboth
the corresponding reading passage, or the question might
theSQuAD2.0andDROPdatasets(Table1)whenemploy-
be unanswerable. This dataset is challenging as there are
ing VERA. Specifically, Mistral-7B-instruct-v0.1 exhibited
questions that might not be answerable from the provided
a 20% increase in accuracy on the SQuAD2.0 dataset and
context.
a 15% increase on the DROP dataset. Additionally, VERA
DROP Dataset The DROP dataset (Dua et al. 2019) enhancedtheperformanceofGPT-4oby5%onSQuAD2.0
servesasareadingcomprehensionbenchmarkdesignedfor and 10% on DROP. These results underscore VERA’s ef-
Discrete Reasoning Over Paragraphs. Comprising 96,000 fectivenessinenhancingtheperformanceoflargelanguage

## Page 6

SQuAD2.0 DROP
mistral-7B-instruct-v0.1 0.416 0.432
gpt-3.5-turbo 0.490 0.696
gpt-4o 0.582 0.816
selfrag7B 0.302 0.234
mistral-7B-instruct-v0.1+VERA 0.582 0.752
gpt-3.5-turbo+VERA 0.640 0.764
gpt-4o+VERA 0.690 0.854
Table1:SQuAD2.0andDROPResults
mistral-7B-instruct-v0.1 gpt-3.5-turbo gpt-4o
ResponseAdherence 0.740 0.862 0.906
WithoutVERA ResponseRelevance 0.761 0.917 0.920
ContextRelevance 0.311 0.308 0.309
ResponseAdherence 0.911 0.970 0.964
WithVERA ResponseRelevance 0.927 0.982 0.944
ContextRelevance 0.876 0.883 0.872
Table2:ComparisonofmodelswithandwithoutVERA-WWIIWikipedia
Figure7:WWIIWikipediaAdherenceScores Figure8:DROPAccuracy
models on tasks that demand advanced comprehension ca- was below 0.45. This can be attributed to the larger chunk
pabilities. size of 512 tokens (Eibich, Nagpal, and Fred-Ojala 2024),
The results of downstream tasks demonstrated a sig- of which only approximately 30% to 45% of the informa-
nificant increase in adherence and relevance scores for tionwasrelevanttothecontext.WhileContextRelevanceis
smaller models like Mistral-7B-instruct-v0.1. Notable im- not directly dependent on the LLM used, we still observed
provements were also observed in larger models such variations in the scores due to the stochastic nature of the
as GPT-4o and GPT-3.5-turbo. Specifically, Mistral-7B- LLMservingastheevaluator(Sunetal.2024).Despitethis
instruct-v0.1 exhibited an increase in Response Adherence inherentvariability,theuseofVERAledtoaclearandcon-
byupto18.7%(Table2)andanincreaseinResponseRele- sistentincreaseinContextRelevanceacrossallexperiments.
vancebyupto17.9%(Table2)whenusingVERA.
Conclusion
TheimprovementsinResponseAdherenceandRelevance
for GPT-4o indicate that VERA can be effectively used Inthiswork,wepresentedVERA,anovelsystemdesigned
for self-improvement (Huang et al. 2022), as the evaluator to address the limitations of Retrieval-Augmented Genera-
model employed was also GPT-4o. This finding is signifi- tion(RAG)inenhancingLargeLanguageModels(LLMs).
cant because it demonstrates that VERA’s performance en- By incorporating an evaluator-cum-enhancer LLM, VERA
hancementsarenotsolelyattributabletotheuseofGPT-4o significantly improves the relevance, adherence, and over-
but rather to the systematic evaluation and refinement pro- allqualityofresponses.Ourapproachinvolvesamulti-step
cessesimplementedbyVERA. process that determines the necessity of retrieval, evaluates
Inallthedownstreamtasks,theinitialContextRelevance andrefinesretrieveddocuments,andrigorouslyassessesand

## Page 7

mistral-7B-instruct-v0.1 gpt-3.5-turbo gpt-4o
ResponseAdherence 0.828 0.900 0.943
WithoutVERA ResponseRelevance 0.716 0.935 0.943
ContextRelevance 0.412 0.427 0.396
ResponseAdherence 0.896 0.950 0.971
WithVERA ResponseRelevance 0.945 0.984 0.972
ContextRelevance 0.895 0.871 0.881
Table3:ComparisonofmodelswithandwithoutVERA-Apple10kReport
correctsthegeneratedresponses self-reflection. arXivpreprintarXiv:2310.11511.
VERA’smethodofbreakingdownresponsesintoatomic Brown,T.B.2020. Languagemodelsarefew-shotlearners.
facts and ensuring each statement’s grounding in the re- arXivpreprintArXiv:2005.14165.
trieved context leads to higher fidelity and relevance in
Douze,M.;Guzhva,A.;Deng,C.;Johnson,J.;Szilvasy,G.;
thefinaloutputs.Ourexperimentalresultsdemonstratethat
Mazare´,P.-E.;Lomeli,M.;Hosseini,L.;andJe´gou,H.2024.
VERA increases adherence and relevance significantly for
Thefaisslibrary. arXivpreprintarXiv:2401.08281.
bothsmallerLLMslikeMistral7Binstructv0.1andlarger
modelslikeGPT-4o,showcasingitsversatilityandeffective- Dua,D.;Wang,Y.;Dasigi,P.;Stanovsky,G.;Singh,S.;and
nessacrossdifferentmodelscales. Gardner,M.2019.DROP:Areadingcomprehensionbench-
mark requiring discrete reasoning over paragraphs. arXiv
TheimprovementsbroughtbyVERAhighlightitspoten-
preprintarXiv:1903.00161.
tial inapplications where accurateand reliable information
generationiscrucial.Bymitigatinghallucinationsandrefin- Dziri, N.; Milton, S.; Yu, M.; Zaiane, O.; and Reddy, S.
ingtheretrievalandresponseprocess,VERApavestheway 2022. On the origin of hallucinations in conversational
formoretrustworthyandcontextuallyappropriateLLMout- models: Is it the datasets or the models? arXiv preprint
puts, advancing the state-of-the-art in retrieval-augmented arXiv:2204.07931.
languagemodeling. Eibich, M.; Nagpal, S.; and Fred-Ojala, A. 2024. AR-
AGOG: Advanced RAG Output Grading. arXiv preprint
LimitationsandFutureWork arXiv:2404.01037.
VERAdemonstratesstrongcapabilitiesinunderstandingse- Es, S.; James, J.; Espinosa-Anke, L.; and Schockaert, S.
mantic changes between the response and context, avoid- 2023. Ragas:Automatedevaluationofretrievalaugmented
ingunnecessarypenaltiesforsemanticallyequivalentstate- generation. arXivpreprintarXiv:2309.15217.
ments (e.g., ”World War II is a deeply engraved event in Gao,L.;Dai,Z.;Pasupat,P.;Chen,A.;Chaganty,A.T.;Fan,
history” and ”World War II is an important event in his- Y.;Zhao,V.Y.;Lao,N.;Lee,H.;Juan,D.-C.;andGuu,K.
tory”). However, during our experimentation, we observed 2023. RARR: Researching and Revising What Language
thatsmallermodelslikeMistral-7B-instructorLlama38B, ModelsSay,UsingLanguageModels. arXiv:2210.08726.
when used as evaluators instead of GPT-4o, struggled to
Huang, J.; Gu, S. S.; Hou, L.; Wu, Y.; Wang, X.; Yu, H.;
handle such semantic nuances effectively. This limitation
andHan,J.2022. Largelanguagemodelscanself-improve.
could potentially be addressed by improving the few-shot
arXivpreprintarXiv:2210.11610.
prompting technique, thereby enhancing evaluation perfor-
Jiang, A. Q.; Sablayrolles, A.; Mensch, A.; Bamford, C.;
mance with smaller models and making the method more
Chaplot, D. S.; Casas, D. d. l.; Bressand, F.; Lengyel, G.;
cost-efficient.
Lample, G.; Saulnier, L.; et al. 2023. Mistral 7B. arXiv
Due to the stochastic nature of the evaluator LLM, the
preprintarXiv:2310.06825.
splitting of the response into atomic statements may vary
slightlywitheachevaluation,resultinginminordifferences Khandelwal, U.; Levy, O.; Jurafsky, D.; Zettlemoyer, L.;
in scores. Although this limitation is largely mitigated by and Lewis, M. 2019. Generalization through memoriza-
using a large dataset in our experiments, it can still cause tion: Nearest neighbor language models. arXiv preprint
minorvariationsinscoresforindividualevaluations. arXiv:1911.00172.
SinceVERAnecessitatesLLMevaluationateachstepof Krishna, K.; Roy, A.; and Iyyer, M. 2021. Hurdles to
the process, it might not be suitable for real-time applica- progress in long-form question answering. arXiv preprint
tions. This limitation could potentially be addressed in the arXiv:2103.06332.
future by combining multiple evaluation calls into a single
Kucharavy, A. 2024. Adapting LLMs to Downstream Ap-
step,therebymakingtheprocessmorestreamlinedandtime-
plications. In Large Language Models in Cybersecurity:
efficient.
Threats, Exposure and Mitigation, 19–29. Springer Nature
SwitzerlandCham.
References
Lewis, P.; Perez, E.; Piktus, A.; Petroni, F.; Karpukhin, V.;
Asai,A.;Wu,Z.;Wang,Y.;Sil,A.;andHajishirzi,H.2023. Goyal, N.; Ku¨ttler, H.; Lewis, M.; Yih, W.-t.; Rockta¨schel,
Self-rag:Learningtoretrieve,generate,andcritiquethrough T.; Riedel, S.; and Kiela, D. 2020. Retrieval-Augmented

## Page 8

Generation for Knowledge-Intensive NLP Tasks. In S.; Shyam, P.; Sidor, S.; Sigler, E.; Simens, M.; Sitkin, J.;
Larochelle, H.; Ranzato, M.; Hadsell, R.; Balcan, M.; and Slama, K.; Sohl, I.; Sokolowsky, B.; Song, Y.; Staudacher,
Lin, H., eds., Advances in Neural Information Processing N.;Such,F.P.;Summers,N.;Sutskever,I.;Tang,J.;Tezak,
Systems,volume33,9459–9474.CurranAssociates,Inc. N.; Thompson, M. B.; Tillet, P.; Tootoonchian, A.; Tseng,
E.; Tuggle, P.; Turley, N.; Tworek, J.; Uribe, J. F. C.; Val-
Longpre, S.; Perisetla, K.; Chen, A.; Ramesh, N.; DuBois,
lone,A.;Vijayvergiya,A.;Voss,C.;Wainwright,C.;Wang,
C.;andSingh,S.2021. Entity-basedknowledgeconflictsin
J.J.;Wang,A.;Wang,B.;Ward,J.;Wei,J.;Weinmann,C.;
questionanswering. arXivpreprintarXiv:2109.05052.
Welihinda, A.; Welinder, P.; Weng, J.; Weng, L.; Wiethoff,
Min, S.; Krishna, K.; Lyu, X.; Lewis, M.; Yih, W.-t.; M.; Willner, D.; Winter, C.; Wolrich, S.; Wong, H.; Work-
Koh, P. W.; Iyyer, M.; Zettlemoyer, L.; and Hajishirzi, H. man, L.; Wu, S.; Wu, J.; Wu, M.; Xiao, K.; Xu, T.; Yoo,
2023. Factscore: Fine-grained atomic evaluation of fac- S.; Yu, K.; Yuan, Q.; Zaremba, W.; Zellers, R.; Zhang, C.;
tual precision in long form text generation. arXiv preprint Zhang, M.; Zhao, S.; Zheng, T.; Zhuang, J.; Zhuk, W.; and
arXiv:2305.14251. Zoph,B.2024.GPT-4TechnicalReport.arXiv:2303.08774.
OpenAI; Achiam, J.; Adler, S.; Agarwal, S.; Ahmad, L.; Rajpurkar, P.; Zhang, J.; Lopyrev, K.; and Liang, P. 2016.
Akkaya, I.; Aleman, F. L.; Almeida, D.; Altenschmidt, J.; Squad: 100,000+ questions for machine comprehension of
Altman, S.; Anadkat, S.; Avila, R.; Babuschkin, I.; Bal- text. arXivpreprintarXiv:1606.05250.
aji, S.; Balcom, V.; Baltescu, P.; Bao, H.; Bavarian, M.; Setty,S.;Jijo,K.;Chung,E.;andVidra,N.2024. Improv-
Belgum, J.; Bello, I.; Berdine, J.; Bernadett-Shapiro, G.; ing Retrieval for RAG based Question Answering Models
Berner, C.; Bogdonoff, L.; Boiko, O.; Boyd, M.; Brakman, onFinancialDocuments. arXivpreprintarXiv:2404.07221.
A.-L.;Brockman,G.;Brooks,T.;Brundage,M.;Button,K.;
Shuster, K.; Poff, S.; Chen, M.; Kiela, D.; and Weston, J.
Cai, T.; Campbell, R.; Cann, A.; Carey, B.; Carlson, C.;
2021. Retrievalaugmentationreduceshallucinationincon-
Carmichael, R.; Chan, B.; Chang, C.; Chantzis, F.; Chen,
versation. arXivpreprintarXiv:2104.07567.
D.; Chen, S.; Chen, R.; Chen, J.; Chen, M.; Chess, B.;
Sun, K.; Wang, R.; Liu, H.; and Søgaard, A. 2024. Com-
Cho, C.; Chu, C.; Chung, H. W.; Cummings, D.; Currier,
prehensive Reassessment of Large-Scale Evaluation Out-
J.; Dai, Y.; Decareaux, C.; Degry, T.; Deutsch, N.; Deville,
comesinLLMs:AMultifacetedStatisticalApproach. arXiv
D.; Dhar, A.; Dohan, D.; Dowling, S.; Dunning, S.; Ecof-
preprintarXiv:2403.15250.
fet, A.; Eleti, A.; Eloundou, T.; Farhi, D.; Fedus, L.; Felix,
N.; Fishman, S. P.; Forte, J.; Fulford, I.; Gao, L.; Georges, Touvron,H.;Martin,L.;Stone,K.;Albert,P.;Almahairi,A.;
E.; Gibson, C.; Goel, V.; Gogineni, T.; Goh, G.; Gontijo- Babaei,Y.;Bashlykov,N.;Batra,S.;Bhargava,P.;Bhosale,
Lopes, R.; Gordon, J.; Grafstein, M.; Gray, S.; Greene, R.; S.; Bikel, D.; Blecher, L.; Ferrer, C. C.; Chen, M.; Cucu-
Gross, J.; Gu, S. S.; Guo, Y.; Hallacy, C.; Han, J.; Harris, rull,G.;Esiobu,D.;Fernandes,J.;Fu,J.;Fu,W.;Fuller,B.;
J.;He,Y.;Heaton,M.;Heidecke,J.;Hesse,C.;Hickey,A.; Gao, C.; Goswami, V.; Goyal, N.; Hartshorn, A.; Hosseini,
Hickey, W.; Hoeschele, P.; Houghton, B.; Hsu, K.; Hu, S.; S.; Hou, R.; Inan, H.; Kardas, M.; Kerkez, V.; Khabsa, M.;
Hu, X.; Huizinga, J.; Jain, S.; Jain, S.; Jang, J.; Jiang, A.; Kloumann, I.; Korenev, A.; Koura, P. S.; Lachaux, M.-A.;
Jiang,R.;Jin,H.;Jin,D.;Jomoto,S.;Jonn,B.;Jun,H.;Kaf- Lavril,T.;Lee,J.;Liskovich,D.;Lu,Y.;Mao,Y.;Martinet,
tan,T.;ŁukaszKaiser;Kamali,A.;Kanitscheider,I.;Keskar, X.; Mihaylov, T.; Mishra, P.; Molybog, I.; Nie, Y.; Poul-
N.S.;Khan,T.;Kilpatrick,L.;Kim,J.W.;Kim,C.;Kim,Y.; ton,A.;Reizenstein,J.;Rungta,R.;Saladi,K.;Schelten,A.;
Kirchner,J.H.;Kiros,J.;Knight,M.;Kokotajlo,D.;Łukasz Silva,R.;Smith,E.M.;Subramanian,R.;Tan,X.E.;Tang,
Kondraciuk; Kondrich, A.; Konstantinidis, A.; Kosic, K.; B.; Taylor, R.; Williams, A.; Kuan, J. X.; Xu, P.; Yan, Z.;
Krueger, G.; Kuo, V.; Lampe, M.; Lan, I.; Lee, T.; Leike, Zarov,I.;Zhang,Y.;Fan,A.;Kambadur,M.;Narang,S.;Ro-
J.;Leung,J.;Levy,D.;Li,C.M.;Lim,R.;Lin,M.;Lin,S.; driguez, A.; Stojnic, R.; Edunov, S.; and Scialom, T. 2023.
Litwin,M.;Lopez,T.;Lowe,R.;Lue,P.;Makanju,A.;Mal- Llama 2: Open Foundation and Fine-Tuned Chat Models.
facini,K.;Manning,S.;Markov,T.;Markovski,Y.;Martin, arXiv:2307.09288.
B.; Mayer, K.; Mayne, A.; McGrew, B.; McKinney, S. M.; Wei, J.; Wang, X.; Schuurmans, D.; Bosma, M.; Xia, F.;
McLeavey,C.;McMillan,P.;McNeil,J.;Medina,D.;Mehta, Chi, E.; Le, Q. V.; Zhou, D.; et al. 2022. Chain-of-
A.; Menick, J.; Metz, L.; Mishchenko, A.; Mishkin, P.; thoughtpromptingelicitsreasoninginlargelanguagemod-
Monaco,V.;Morikawa,E.;Mossing,D.;Mu,T.;Murati,M.; els. Advancesinneuralinformationprocessingsystems,35:
Murk,O.;Me´ly,D.;Nair,A.;Nakano,R.;Nayak,R.;Nee- 24824–24837.
lakantan, A.; Ngo, R.; Noh, H.; Ouyang, L.; O’Keefe, C.;
Yan, S.-Q.; Gu, J.-C.; Zhu, Y.; and Ling, Z.-H. 2024.
Pachocki, J.; Paino, A.; Palermo, J.; Pantuliano, A.; Paras-
Corrective retrieval augmented generation. arXiv preprint
candolo,G.;Parish,J.;Parparita,E.;Passos,A.;Pavlov,M.;
arXiv:2401.15884.
Peng, A.; Perelman, A.; de Avila Belbute Peres, F.; Petrov,
M.; de Oliveira Pinto, H. P.; Michael; Pokorny; Pokrass,
M.; Pong, V. H.; Powell, T.; Power, A.; Power, B.; Proehl,
E.; Puri, R.; Radford, A.; Rae, J.; Ramesh, A.; Raymond,
C.; Real, F.; Rimbach, K.; Ross, C.; Rotsted, B.; Roussez,
H.; Ryder, N.; Saltarelli, M.; Sanders, T.; Santurkar, S.;
Sastry, G.; Schmidt, H.; Schnurr, D.; Schulman, J.; Sel-
sam, D.; Sheppard, K.; Sherbakov, T.; Shieh, J.; Shoker,
