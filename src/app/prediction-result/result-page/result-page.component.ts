import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/shared/data-exchange.service';
import { Questionnaire, PHOTO_DESCRIPTIONS } from 'src/app/landing-page/dynamic-form/types/questionnaire';
import { TranslateService } from '@ngstack/translate';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  activeLanguage = "de";
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartType = 'horizontalBar';
  barChartLegend = true;

  barChartDataDE;
  barChartDataEN;

  barChartLabelsDE = ["A: Wärme", "B: Vernunft", "C: Emotionale Stabilität", "E: Dominanz", "F: Lebendigkeit", "G: Regelbewusstsein", "H: Soziale Kühnheit", "I: Sensibilität", "L: Wachsamkeit", "M: Abstraktion", "N: Geheimhaltung", "O: Besorgnis", "Q1: Offenheit für Veränderungen", "Q2: Eigenverantwortung", "Q3: Perfektionismus", "Q4: Anspannung"];
  barChartLabelsEN = ["A: Warmth", "B: Reasoning", "C: Emotional Stability", "E: Dominance", "F: Liveliness", "G: Rule-Consciousness", "H: Social Boldness", "I: Sensitivity", "L: Vigilance", "M: Abstractedness", "N: Privateness", "O: Apprehension", "Q1: Openness to Change", "Q2: Self-Reliance", "Q3: Perfectionism", "Q4: Tension"];


  //questionnaire = new Questionnaire("debug@mail.de", ["assets/images/face-neutral.svg", "assets/images/face-happy.svg", "assets/images/face-sad.svg", "assets/images/face-random.svg"], [{ "I1": "1", "I2": "5", "I3": "3", "I4": "2", "I5": "2", "I6": "3", "I7": "4", "I8": "5", "A1": "0", "I9": "5", "Q3_2": "0", "A2": "0", "Q3_1": "0", "A3": "0", "Q3_4": "0", "A4": "0", "Q3_3": "0", "A5": "0", "A6": "0", "A7": "0", "A8": "0", "A9": "0", "Q3_9": "0", "Q3_6": "0", "Q3_5": "0", "Q3_8": "0", "Q3_7": "0", "A10": "0", "E10": "0", "I10": "1", "M10": "0", "B1": "0", "B2": "0", "B3": "0", "B4": "0", "B5": "0", "Q1_10": "0", "B6": "0", "B7": "0", "B8": "0", "B9": "0", "C1": "0", "C2": "0", "C3": "0", "Q2_3": "0", "C4": "0", "Q2_2": "0", "C5": "0", "Q2_5": "0", "C6": "0", "Q2_4": "0", "C7": "0", "C8": "0", "C9": "0", "Q2_1": "0", "Q2_7": "0", "Q2_6": "0", "Q2_9": "0", "Q2_8": "0", "L1": "0", "H10": "0", "L2": "0", "L3": "0", "L4": "0", "L5": "0", "L10": "0", "L6": "0", "L7": "0", "L8": "0", "L9": "0", "M1": "0", "M2": "0", "M3": "0", "M4": "0", "M5": "0", "M6": "0", "M7": "0", "M8": "0", "E1": "0", "M9": "0", "E2": "0", "E3": "0", "E4": "0", "E5": "0", "Q1_4": "0", "Q2_10": "0", "E6": "0", "Q1_3": "0", "E7": "0", "Q1_6": "0", "E8": "0", "Q1_5": "0", "E9": "0", "Q1_2": "0", "Q1_1": "0", "Q1_8": "0", "Q1_7": "0", "Q1_9": "0", "C10": "0", "N1": "0", "N2": "0", "N3": "0", "N4": "0", "G10": "0", "N5": "0", "N6": "0", "N7": "0", "N8": "0", "F1": "0", "N9": "0", "F2": "0", "F3": "0", "F4": "0", "F5": "0", "O10": "0", "F6": "0", "F7": "0", "F8": "0", "F9": "0", "O1": "0", "O2": "0", "O3": "0", "O4": "0", "O5": "0", "O6": "0", "O7": "0", "O8": "0", "G1": "0", "O9": "0", "G2": "0", "G3": "0", "G4": "0", "G5": "0", "G6": "0", "G7": "0", "Q4_1": "0", "G8": "0", "G9": "0", "Q4_3": "0", "Q4_2": "0", "Q4_9": "0", "Q4_8": "0", "Q4_5": "0", "Q4_4": "0", "Q4_7": "0", "Q4_6": "0", "B10": "0", "F10": "0", "H1": "0", "H2": "0", "H3": "0", "H4": "0", "N10": "0", "H5": "0", "H6": "0", "H7": "0", "H8": "0", "H9": "0", "Q3_10": "0", "Q4_10": "2" }], "23", "1", "600");
  questionnaire: Questionnaire;
  photoDescriptions = PHOTO_DESCRIPTIONS;
  descriptionLabel = this.photoDescriptions[0].label;

  constructor(private dataExchangeService: DataExchangeService, private translate: TranslateService, private httpService: HttpService) { }

  ngOnInit() {
    setTimeout(() => {
      this.questionnaire = this.dataExchangeService.questionnaire;
      const prediction = this.dataExchangeService.prediction;

      if (prediction !== undefined) {
        this.questionnaire = new Questionnaire("?", this.dataExchangeService.photos, null, "?", "?", "?")
        this.questionnaire.id = 0;
        this.questionnaire.photos = this.dataExchangeService.photos;

        this.prepareChart(prediction);
      }
      else {
        this.httpService.getTestAverage(this.questionnaire.id).subscribe((resultArray) => {
          this.prepareChart(resultArray);
        }), 1500; // Just for the "feeling". Evaluate if necessary, 1500
      }
    });

    // ERROR: There seems to be a loading problem when using Subject. Might be different with BehaviourSubject
    /*  this.dataExchangeService.getData().subscribe((questionnaire) => {
       setTimeout(() => {
         this.questionnaire = questionnaire; this.prepareChart(), 1500; // Just for the "feeling". Evaluate if necessary, 1500
       }); // Just for the "feeling". Evaluate if necessary
     }); */
    //this.questionnaire.id = 1337; // DEV MODE 
    this.translate.activeLangChanged.subscribe(lang => this.activeLanguage = lang.currentValue);
  }

  swapMainPhoto(i: number) {
    let h = this.photoDescriptions[0];
    this.photoDescriptions[0] = this.photoDescriptions[i];
    this.photoDescriptions[i] = h;
    this.descriptionLabel = this.photoDescriptions[0].label;

    let h2 = this.questionnaire.photos[0];
    this.questionnaire.photos[0] = this.questionnaire.photos[i];
    this.questionnaire.photos[i] = h2;
  }

  printResultToPdf() { }

  prepareChart(resultArray) {
    // Workaround for setting min and max values on the graph
    resultArray.push(0);
    resultArray.push(5);

    this.barChartDataDE = [
      { data: resultArray, label: "Ergebnis" }
      /* { data: [], label: "Vorhersage"} */
    ];
    this.barChartDataEN = [
      { data: resultArray, label: "Result" }
      /* { data: [], label: "Prediction"} */
    ]
  }
}
