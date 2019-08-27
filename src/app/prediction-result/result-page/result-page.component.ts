import { Component, OnInit, Input } from '@angular/core';
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

  traitLabelsDE = ["A: Wärme", "B: Vernunft", "C: Emotionale Stabilität", "E: Dominanz", "F: Lebendigkeit", "G: Regelbewusstsein", "H: Soziale Kühnheit", "I: Sensibilität", "L: Wachsamkeit", "M: Abstraktion", "N: Geheimhaltung", "O: Besorgnis", "Q1: Offenheit für Veränderungen", "Q2: Eigenverantwortung", "Q3: Perfektionismus", "Q4: Anspannung"];
  traitLabelsEN = ["A: Warmth", "B: Reasoning", "C: Emotional Stability", "E: Dominance", "F: Liveliness", "G: Rule-Consciousness", "H: Social Boldness", "I: Sensitivity", "L: Vigilance", "M: Abstractedness", "N: Privateness", "O: Apprehension", "Q1: Openness to Change", "Q2: Self-Reliance", "Q3: Perfectionism", "Q4: Tension"];
  traitCharacteristicsDE = [ ["Sachbezogen ", "Kontaktfreudig"], ["Konkretes Denkvermögen", "Abstraktes Denkvermögen"], ["Leicht zu beunruhigen", "Seelisch stabil"], ["Anpassungsbereit", "Eigenwillig"], ["Ruhig", "Lebhaft"], ["Sorglos", "Gewissenhaft"], ["Schüchtern", "Draufgängerisch"], ["Dickfellig", "Feinfühlig"], ["Gutgläubig", "Misstrauisch"], ["Realistisch", "Träumerisch"], ["Direkt", "Diplomatisch"], ["Selbstbewusst", "Selbstkritisch"], ["Konservativ gegenüber Veränderung", "Für Veränderung offen"], ["Anlehnungsbedürftig", "Eigenständig"], ["Impulsiv", "Organsiert"], ["Ausgeglichen", "Angespannt"]]

  questionnaire: Questionnaire;
  photoDescriptions = PHOTO_DESCRIPTIONS;
  descriptionLabel = this.photoDescriptions[0].label;

  @Input() classificationResults: number[];
  @Input() imageSourceToClassify: string;

  constructor(private dataExchangeService: DataExchangeService, private translate: TranslateService, private httpService: HttpService) { }

  ngOnInit() {
    setTimeout(() => {
   /*    this.classificationResults = this.dataExchangeService.prediction;
      this.imageSourceToClassify = this.dataExchangeService.photos[0]; */
       //this.classificationResults = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
    }, 0);

    this.dataExchangeService.classificationSubject.subscribe(classification => this.classificationResults = classification);
    this.dataExchangeService.imageSubject.subscribe(imageSource => this.imageSourceToClassify = imageSource);

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
}
